import {
  TVerifiedData,
  DataVersions,
  IVerifiedDataLegacy,
  IVerifiedDataOnChain,
  IVerifiableCredential,
  IPresentationProof,
  IVerifiablePresentation,
  IMerkleProofNode,
  IMerkleProofShare,
} from './types'
import {validateVerifiablePresentation} from './Validation'
import {HashingLogic} from '@bloomprotocol/attestations-lib'
import _ from 'lodash'
import {TDecodedLog, getDecodedTxEventLogs, getDecodedLogValueByName} from './txUtils'

export const stripHexPrefix = (hexStr: string): string => {
  if (hexStr.length < 2) return hexStr
  if (hexStr.slice(0, 2) === '0x') return hexStr.slice(2)
  return hexStr
}

export const toBuffer = (s: string) => new Buffer(stripHexPrefix(s), 'hex')

export const isNullOrWhiteSpace = (value: any): boolean => typeof value !== 'string' || value.trim() === ''

// Implementation from http://whitfin.io/sorting-object-recursively-node-jsjavascript/
export function sortObject<T>(object: any): T {
  let sortedObj: any = {}
  let keys = _.keys(object)
  keys = _.sortBy(keys, (key: string) => {
    return key
  })

  _.each(keys, (key: string) => {
    if (typeof object[key] === 'object' && !(object[key] instanceof Array)) {
      sortedObj[key] = sortObject(object[key])
    } else {
      sortedObj[key] = object[key]
    }
  })

  return sortedObj as T
}

export const formatMerkleProofForShare = (proof: IMerkleProofNode[]): IMerkleProofShare[] => {
  return proof.map(node => {
    return {
      position: node.position,
      data: '0x' + node.data.toString('hex'),
    }
  })
}

export type TVerificationError = {
  key: string
  error: string
}

export interface IValidateResponseDataOutput {
  errors: TVerificationError[]
  data: IVerifiablePresentation
  logs: TDecodedLog[]
}

export interface IValidateResponseDataOptions {
  validateOnChain: boolean
  web3Provider?: string
}

export interface IRetrieveTxDataOutput {
  logs: TDecodedLog[]
  errors: TVerificationError[]
}

export const retreiveTxData = async (
  payloadData: IVerifiedDataLegacy | IVerifiedDataOnChain,
  web3Provider: string
): Promise<IRetrieveTxDataOutput> => {
  const txHash = payloadData.tx
  let logs: TDecodedLog[] = []
  const errors: TVerificationError[] = []
  if (isNullOrWhiteSpace(txHash) || txHash === '0x') {
    errors.push({
      key: 'tx',
      error: `tx is missing in payload for node with hash ${payloadData.layer2Hash}`,
    })
  } else {
    try {
      logs = await getDecodedTxEventLogs(web3Provider, txHash)
    } catch (err) {
      errors.push({
        key: 'getDecodedLogsFailed',
        error: `${err}`,
      })
    }
  }
  return {
    logs,
    errors,
  }
}

const validateOnChainProperties = (
  subject: string,
  payloadData: TVerifiedData,
  logs: TDecodedLog[]
): TVerificationError[] => {
  const errors: TVerificationError[] = []
  // verify subject shared dataHash matches chain by using it as a part of the find logic
  const matchingTraitAttestedLogs =
    logs &&
    logs.find(l => l.name === 'TraitAttested' && getDecodedLogValueByName(l, 'dataHash') === payloadData.layer2Hash)
  if (!matchingTraitAttestedLogs) {
    errors.push({
      key: 'TraitAttested',
      error: "Unable to find 'TraitAttested' event logs with a" + ` 'dataHash' of '${payloadData.layer2Hash}'.`,
    })
    return errors
  }

  // verify shared subject address matches chain
  const onChainSubjectAddress = getDecodedLogValueByName(matchingTraitAttestedLogs, 'subject')
  if (subject !== onChainSubjectAddress) {
    errors.push({
      key: 'subject',
      error:
        'The on chain subject address does not match what was shared.' +
        `\nShared subject address: '${subject}'` +
        `\nOn chain subject address: '${onChainSubjectAddress}'`,
    })
  }

  // verify shared attester address matches chain
  const onChainAttesterAddress = getDecodedLogValueByName(matchingTraitAttestedLogs, 'attester')
  if (payloadData.attester !== onChainAttesterAddress) {
    errors.push({
      key: 'attester',
      error:
        'The on chain attester address does not match what was shared.' +
        `\nShared attester address: '${payloadData.attester}'` +
        `\nOn chain attester address: '${onChainAttesterAddress}'`,
    })
  }

  return errors
}

export const validateUntypedResponseData = async (
  responseData: any,
  options: IValidateResponseDataOptions
): Promise<
  | {kind: 'invalid'; errors: TVerificationError[]}
  | {kind: 'validated'; data: IVerifiablePresentation; logs: TDecodedLog[]}
> => {
  if (!responseData) {
    return {
      kind: 'invalid',
      errors: [{key: 'missingResponseData', error: 'Failed to validate falsey responseData'}],
    }
  }

  const errors: TVerificationError[] = []
  const outcome = validateVerifiablePresentation(responseData)
  if (outcome.kind === 'invalid_param') {
    errors.push({key: outcome.kind, error: outcome.message})
  }

  if (errors.length > 0) {
    return {kind: 'invalid', errors: errors}
  }

  const typedResponseData: IVerifiablePresentation = responseData
  const logs: TDecodedLog[] = []
  if (options.validateOnChain) {
    await Promise.all(
      typedResponseData.verifiableCredential.map(async d => {
        // Verify the on-chain data integrity
        switch (d.proof.data.version) {
          case DataVersions.legacy:
          case DataVersions.onChain:
            try {
              const retreiveTxDataOutput = await retreiveTxData(d.proof.data, options.web3Provider!)
              errors.push(...retreiveTxDataOutput.errors)
              logs.push(...retreiveTxDataOutput.logs)
              errors.push(
                ...validateOnChainProperties(d.credentialSubject.subject, d.proof.data, retreiveTxDataOutput.logs)
              )
            } catch (err) {
              errors.push({
                key: 'onChainValidationFailed',
                error: `Failed to validate on chain data integrity for node with hash ${d.proof.data.layer2Hash}`,
              })
            }
            break
          case DataVersions.batch:
            break
          default:
            break
        }
      })
    )
  }
  return {
    kind: 'validated',
    data: typedResponseData,
    logs: logs,
  }
}

export const getPresentationProof = (
  subject: string,
  token: string,
  domain: string,
  credential: IVerifiableCredential[]
): IPresentationProof => {
  return {
    type: 'Bloom-Presentation-1.0.0',
    created: new Date().toISOString(),
    creator: subject,
    nonce: token,
    domain: domain,
    credentialHash: HashingLogic.hashMessage(HashingLogic.orderedStringify(credential)),
  }
}
