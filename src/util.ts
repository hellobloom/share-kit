import {IProofShare, IVerifiedData, IProof, ResponseData} from './types'
import {HashingLogic} from '@bloomprotocol/attestations-lib'
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
export const verifyOffChainDataIntegrity = (
  data: IVerifiedData,
  verificationErrors: TVerificationError[]
): TVerificationError[] => {
  // confirm root hash becomes layer 2 hash - hash(rootHash, rootHashnonce)
  const recoveredLayer2Hash = HashingLogic.hashMessage(
    HashingLogic.orderedStringify({
      rootHash: data.rootHash,
      nonce: data.rootHashNonce,
    })
  )
  if (data.layer2Hash !== recoveredLayer2Hash) {
    verificationErrors.push({
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
    verificationErrors.push({
      key: 'attester',
      error:
        "The provided 'attester' doesn't match the value" +
        " recovered for the target 'attestationNode' and 'signedAttestation'.",
    })
  }

  // verify merkle proof
  if (!verifyProof(data)) {
    verificationErrors.push({
      key: 'proof',
      error: "The provided 'proof' is invalid for the given 'signedAttestation' and 'rootHash'.",
    })
  }

  return verificationErrors
}

export const verifySender = (responseData: ResponseData, errors: TVerificationError[]): TVerificationError[] => {
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

export const verifyPackedData = (responseData: ResponseData, errors: TVerificationError[]): TVerificationError[] => {
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

export interface IValidatedPayloadData {
  data: IVerifiedData
  errors: TVerificationError[]
  logs?: TDecodedLog[]
}

export interface IValidateResponseDataOutput {
  payloadErrors: TVerificationError[]
  payloadData: IValidatedPayloadData[]
}

export interface IValidateResponseDataOptions {
  validateOnChain: true
  web3Provider: string
}

export const verifyDataNodes = (responseData: ResponseData): IValidatedPayloadData[] => {
  const validatedPayloadData = responseData.data.map(d => {
    return {
      data: d,
      errors: verifyOffChainDataIntegrity(d, []),
    }
  })
  return validatedPayloadData
}

export const retreiveTxData = async (
  validatedPayload: IValidatedPayloadData,
  web3Provider: string
): Promise<IValidatedPayloadData> => {
  const txHash = validatedPayload.data.tx
  if (isNullOrWhiteSpace(txHash) || txHash === '0x') {
    validatedPayload.errors.push({
      key: 'tx',
      error: `tx is missing in payload for node with hash ${validatedPayload.data.layer2Hash}`,
    })
  } else {
    try {
      validatedPayload.logs = await getDecodedTxEventLogs(web3Provider, txHash)
    } catch (err) {
      validatedPayload.errors.push({
        key: 'getDecodedLogsFailed',
        error: `${err}`,
      })
    }
  }
  return validatedPayload
}

const validateOnChainProperties = (subject: string, validatedPayload: IValidatedPayloadData): IValidatedPayloadData => {
  // verify subject shared dataHash matches chain by using it as a part of the find logic
  const matchingTraitAttestedLogs =
    validatedPayload.logs &&
    validatedPayload.logs.find(
      l => l.name === 'TraitAttested' && getDecodedLogValueByName(l, 'dataHash') === validatedPayload.data.layer2Hash
    )
  if (!matchingTraitAttestedLogs) {
    validatedPayload.errors.push({
      key: 'TraitAttested',
      error:
        "Unable to find 'TraitAttested' event logs with a" + ` 'dataHash' of '${validatedPayload.data.layer2Hash}'.`,
    })
    return validatedPayload
  }

  // verify shared subject address matches chain
  const onChainSubjectAddress = getDecodedLogValueByName(matchingTraitAttestedLogs, 'subject')
  if (subject !== onChainSubjectAddress) {
    validatedPayload.errors.push({
      key: 'subject',
      error:
        'The on chain subject address does not match what was shared.' +
        `\nShared subject address: '${subject}'` +
        `\nOn chain subject address: '${onChainSubjectAddress}'`,
    })
  }

  // verify shared attester address matches chain
  const onChainAttesterAddress = getDecodedLogValueByName(matchingTraitAttestedLogs, 'attester')
  if (validatedPayload.data.attester !== onChainAttesterAddress) {
    validatedPayload.errors.push({
      key: 'attester',
      error:
        'The on chain attester address does not match what was shared.' +
        `\nShared attester address: '${validatedPayload.data.attester}'` +
        `\nOn chain attester address: '${onChainAttesterAddress}'`,
    })
  }

  return validatedPayload
}

export const validateResponseData = async (
  responseData: ResponseData,
  options: IValidateResponseDataOptions
): Promise<IValidateResponseDataOutput> => {
  let payloadErrors: TVerificationError[] = []

  // Sort payload to ensure it was properly formatted
  const shareKitPayload: ResponseData = sortObject(responseData)
  shareKitPayload.data = shareKitPayload.data.map(d => sortObject(d))

  // Validate the integrity of basic off-chain properties (subject, packedData)
  payloadErrors = verifySender(shareKitPayload, payloadErrors)
  payloadErrors = verifyPackedData(shareKitPayload, payloadErrors)

  const validatedPayloadData: IValidatedPayloadData[] = []

  await Promise.all(
    shareKitPayload.data.map(async d => {
      // Verify the off-chain data integrity of each data node
      let dTemp = {
        data: d,
        errors: verifyOffChainDataIntegrity(d, []),
      }
      if (options.validateOnChain) {
        // Verify the on-chain data integrity
        try {
          dTemp = await retreiveTxData(dTemp, options.web3Provider)
          dTemp = validateOnChainProperties(responseData.subject, dTemp)
        } catch (err) {
          dTemp.errors.push({key: 'onChainValidation', error: 'Failed to validate on chain data integrity'})
        }
      }
      validatedPayloadData.push(dTemp)
    })
  )

  return {
    payloadErrors: payloadErrors,
    payloadData: validatedPayloadData,
  }
}
