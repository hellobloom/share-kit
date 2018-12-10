import {IProofShare, IVerifiedData, IProof} from './types'
import {HashingLogic} from '@bloomprotocol/attestations-lib'

export const stripHexPrefix = (hexStr: string): string => {
  if (hexStr.length < 2) return hexStr
  if (hexStr.slice(0, 2) === '0x') return hexStr.slice(2)
  return hexStr
}

export const toBuffer = (s: string) => new Buffer(stripHexPrefix(s), 'hex')

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
  const verificationErrors: TVerificationError[] = []

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
