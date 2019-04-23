import {IProofShare, IVerifiedData, IProof, ResponseData} from './types'
import {HashingLogic, TAttestationTypeNames} from '@bloomprotocol/attestations-lib'
import _ from 'lodash'
import {keccak256} from 'js-sha3'
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

export const formatProofForVerify = (proof: IProofShare[]): IProof[] => {
  return proof.map(node => {
    return {
      position: node.position,
      data: toBuffer(node.data),
    }
  })
}

export const formatProofForShare = (proof: IProof[]): IProofShare[] => {
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

export const verifyProof = (data: IVerifiedData): boolean => {
  const proof = formatProofForVerify(data.proof)
  const targetNode = toBuffer(HashingLogic.hashMessage(data.target.signedAttestation))
  const root = toBuffer(data.rootHash)

  return HashingLogic.verifyMerkleProof(proof, targetNode, root)
}

/**
 * Given an `IverifiedData` object this function will verify off chain data properties such as
 * - Verifies that when hashing the rootHash and rootHash nonce the layer2Hash that's recovered
 * matches what was provided
 * - Confirms that the attester addresses provided matches the recovered address when recovering
 * via `ecrecover` using the attestationNode and signature provided
 * - Verifies the merkle proof using the root hash and target node (signed attestation)
 *
 * @param data Object of type `IverifiedData` declared in `types.ts`
 * @return If all verifications succeed an empty array is returned, otherwise any verification
 * issues are reported back as an array of `TVerificationError` objects.
 */
export const verifyOffChainDataIntegrity = (data: IVerifiedData): TVerificationError[] => {
  const errors: TVerificationError[] = []
  // confirm root hash becomes layer 2 hash - hash(rootHash, rootHashnonce)
  const recoveredLayer2Hash = HashingLogic.hashMessage(
    HashingLogic.orderedStringify({
      rootHash: data.rootHash,
      nonce: data.rootHashNonce,
    })
  )
  if (data.layer2Hash !== recoveredLayer2Hash) {
    errors.push({
      key: 'layer2Hash',
      error:
        "The provided 'layer2Hash' doesn't match the value" +
        " recovered for the given 'rootHash' and 'rootHashNonce'.",
    })
  }

  // confirm attester signature of target node
  const recoveredAttesterAddress = HashingLogic.recoverHashSigner(
    HashingLogic.hashAttestationNode(data.target.attestationNode),
    data.target.signedAttestation
  )
  if (data.attester !== recoveredAttesterAddress) {
    errors.push({
      key: 'attester',
      error:
        "The provided 'attester' doesn't match the value" +
        " recovered for the target 'attestationNode' and 'signedAttestation'.",
    })
  }

  // verify merkle proof
  if (!verifyProof(data)) {
    errors.push({
      key: 'proof',
      error: "The provided 'proof' is invalid for the given 'signedAttestation' and 'rootHash'.",
    })
  }

  return errors
}

export const verifySender = (responseData: ResponseData): TVerificationError[] => {
  const errors: TVerificationError[] = []
  const signerEthAddress = HashingLogic.recoverHashSigner(toBuffer(responseData.packedData), responseData.signature)
  // Here is where chained authorizations would be checked if present
  if (responseData.subject !== signerEthAddress) {
    errors.push({
      key: 'subject',
      error:
        "The recovered subject address based on the 'packedData' and 'signature'" +
        ' does not match the one that was shared.' +
        `\nShared subject address: '${responseData.subject}'` +
        `\nRecovered subject address: '${signerEthAddress}'`,
    })
  }
  return errors
}

export const verifyPackedData = (responseData: ResponseData): TVerificationError[] => {
  const errors: TVerificationError[] = []
  const recoveredPackedData =
    '0x' +
    keccak256(
      JSON.stringify({
        data: responseData.data,
        token: responseData.token,
      })
    )
  if (responseData.packedData !== recoveredPackedData) {
    errors.push({
      key: 'packedData',
      error:
        "The recovered packed data hash computed by running 'keccak256' on an object" +
        " containing the shared 'data' and 'token' does not match the 'packedData'" +
        ' that was shared.' +
        `\nShared packed data: '${responseData.packedData}'` +
        `\nRecovered packed data: '${recoveredPackedData}'`,
    })
  }
  return errors
}

export interface IDecodedDataAndLogs {
  shareData: IVerifiedData
  logs: TDecodedLog[]
}

export interface IConsumableData {
  data: string
  type: TAttestationTypeNames
  version: string
  logs?: TDecodedLog[]
}

export interface IValidatedPayloadData {
  data: IVerifiedData
  errors: TVerificationError[]
  logs?: TDecodedLog[]
}

export interface IValidateResponseDataOutput {
  errors: TVerificationError[]
  data: IConsumableData[]
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
  payloadData: IVerifiedData,
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
  payloadData: IVerifiedData,
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

export const validateResponseData = async (
  responseData: ResponseData,
  options: IValidateResponseDataOptions
): Promise<IValidateResponseDataOutput> => {
  if (options.validateOnChain && isNullOrWhiteSpace(options.web3Provider)) {
    return {
      data: [],
      errors: [
        {
          key: 'invalidOptions',
          error: 'Unable to `validateOnChain` without a `web3Provider`.',
        },
      ],
    }
  }

  const errors: TVerificationError[] = []

  // Sort payload to ensure it was properly formatted
  const shareKitPayload: ResponseData = sortObject(responseData)
  shareKitPayload.data = shareKitPayload.data.map(d => sortObject(d))

  // Validate the integrity of basic off-chain properties (subject, packedData)
  errors.push(...verifySender(shareKitPayload))
  errors.push(...verifyPackedData(shareKitPayload))

  const consumableData: IConsumableData[] = []

  await Promise.all(
    shareKitPayload.data.map(async d => {
      // Verify the off-chain data integrity of each data node
      let dTemp: IConsumableData = {
        data: d.target.attestationNode.data.data,
        type: d.target.attestationNode.type.type,
        version: d.target.attestationNode.data.version,
      }
      if (options.validateOnChain) {
        // Verify the on-chain data integrity
        try {
          const retreiveTxDataOutput = await retreiveTxData(d, options.web3Provider!)
          errors.push(...retreiveTxDataOutput.errors)
          dTemp.logs = retreiveTxDataOutput.logs
          errors.push(...validateOnChainProperties(responseData.subject, d, dTemp.logs))
        } catch (err) {
          errors.push({
            key: 'onChainValidationFailed',
            error: `Failed to validate on chain data integrity for node with hash ${d.layer2Hash}`,
          })
        }
      }
      consumableData.push(dTemp)
    })
  )

  return {
    errors: errors,
    data: consumableData,
  }
}

export const validateUntypedResponseData = async (
  responseData: any,
  options: IValidateResponseDataOptions
): Promise<IValidateResponseDataOutput> => {
  if (!responseData) {
    return {
      errors: [{key: 'missingResponseData', error: 'Failed to validate falsey responseData'}],
      data: [],
    }
  }

  const errors: TVerificationError[] = []

  let fields: Array<keyof ResponseData> = ['token', 'subject', 'packedData', 'signature']
  fields.forEach((x: keyof ResponseData) => {
    if (isNullOrWhiteSpace(responseData[x])) {
      errors.push({
        key: `ResponseData.${x}`,
        error: `Request body requires a non-whitespace '${x}' property of type string.`,
      })
    }
  })

  if (!(responseData.data instanceof Array) || !responseData.data.length) {
    errors.push({
      key: 'ResponseData.data',
      error: "Request body requires a non-empty 'data' property of type Array.",
    })
  }

  if (errors.length > 0) {
    return {errors, data: []}
  }

  const typedResponseData: ResponseData = responseData
  return await validateResponseData(typedResponseData, options)
}
