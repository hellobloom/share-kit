import * as EthU from 'ethereumjs-util'
import {genValidateFn, TUnvalidated} from './validator'
import {Validation as HashingValidation, HashingLogic} from '@bloomprotocol/attestations-lib'
import {
  DataVersions,
  IVerifiableCredential,
  ICredentialProof,
  IPresentationProof,
  IVerifiablePresentation,
  IMerkleProofShare,
  IMerkleProofNode,
  TVerifiedData,
} from './types'

export const isValidPositionString = (value: any): boolean => {
  return ['left', 'right'].indexOf(value) > -1
}

export const isValidStageString = (value: any): boolean => {
  return ['mainnet', 'rinkeby', 'local'].indexOf(value) > -1
}

export const validateProofShare = genValidateFn([
  ['position', isValidPositionString, false],
  ['data', HashingValidation.isValidHash, false],
])

export const isValidMerkleProofArray = (value: any): boolean => {
  if (!Array.isArray(value)) return false
  if (value.length === 0) return false
  return value.every(v => validateProofShare(v).kind === 'validated')
}

export const isValidLegacyDataNode = (value: any): boolean =>
  HashingValidation.validateDataNodeLegacy(value).kind === 'validated'

export const validateVerifiedDataLegacy = genValidateFn([
  ['version', (value: any) => value === DataVersions.legacy, false],
  ['tx', HashingValidation.isValidHash, false],
  ['layer2Hash', HashingValidation.isValidHash, false],
  ['rootHash', HashingValidation.isValidHash, false],
  ['rootHashNonce', HashingValidation.isValidHash, false],
  ['proof', isValidMerkleProofArray, false],
  ['stage', isValidStageString, false],
  ['target', isValidLegacyDataNode, false],
  ['attester', EthU.isValidAddress, false],
])

export const isValidClaimNode = (value: any): boolean => HashingValidation.validateClaimNode(value).kind === 'validated'

export const validateVerifiedDataOnChain = genValidateFn([
  ['version', (value: any) => value === DataVersions.onChain, false],
  ['tx', HashingValidation.isValidHash, false],
  ['layer2Hash', HashingValidation.isValidHash, false],
  ['rootHash', HashingValidation.isValidHash, false],
  ['rootHashNonce', HashingValidation.isValidHash, false],
  ['proof', isValidMerkleProofArray, false],
  ['stage', isValidStageString, false],
  ['target', isValidClaimNode, false],
  ['attester', EthU.isValidAddress, false],
])

export const validateVerifiedDataBatch = genValidateFn([
  ['version', (value: any) => value === DataVersions.batch, false],
  ['batchLayer2Hash', HashingValidation.isValidHash, false],
  ['batchAttesterSig', HashingValidation.isValidSignatureString, false],
  ['subjectSig', HashingValidation.isValidSignatureString, false],
  ['requestNonce', HashingValidation.isValidHash, false],
  ['layer2Hash', HashingValidation.isValidHash, false],
  ['rootHash', HashingValidation.isValidHash, false],
  ['rootHashNonce', HashingValidation.isValidHash, false],
  ['proof', isValidMerkleProofArray, false],
  ['stage', isValidStageString, false],
  ['target', isValidClaimNode, false],
  ['attester', EthU.isValidAddress, false],
  ['subject', EthU.isValidAddress, false],
])

export const isValidVerifiedData = (value: any): boolean => {
  if (validateVerifiedDataLegacy(value).kind === 'validated') return true
  if (validateVerifiedDataOnChain(value).kind === 'validated') return true
  if (validateVerifiedDataBatch(value).kind === 'validated') return true
  return false
}

export const isOptionalArrayOfAuthorizations = (value: any): boolean => {
  if (!Array.isArray(value)) return false
  return true
  // TODO add authorization validation
}

export const formatMerkleProofForVerify = (proof: IMerkleProofShare[]): IMerkleProofNode[] => {
  return proof.map(node => {
    return {
      position: node.position,
      data: EthU.toBuffer(node.data),
    }
  })
}

export const verifyCredentialMerkleProof = (value: TVerifiedData): boolean => {
  const proof = formatMerkleProofForVerify(value.proof)
  let targetNode: Buffer
  switch (value.version) {
    case DataVersions.legacy:
      targetNode = EthU.toBuffer(HashingLogic.hashMessage(value.target.signedAttestation))
      break
    case DataVersions.onChain:
    case DataVersions.batch:
      targetNode = EthU.toBuffer(HashingLogic.hashMessage(value.target.attesterSig))
      break
    default:
      return false
  }
  const root = EthU.toBuffer(value.rootHash)

  return HashingLogic.verifyMerkleProof(proof, targetNode, root)
}

export const validateCredentialProof = genValidateFn([
  ['type', HashingValidation.isNotEmptyString, false],
  ['created', HashingValidation.isValidRFC3339DateTime, false],
  ['creator', EthU.isValidAddress, false],
  ['data', isValidVerifiedData, false],
  ['data', verifyCredentialMerkleProof, false],
])

export const isValidCredentialProof = (value: any): boolean => validateCredentialProof(value).kind === 'validated'

export const validateCredentialSubject = genValidateFn([
  ['subject', EthU.isValidAddress, false],
  ['data', HashingValidation.isNotEmptyString, false],
  ['authorization', isOptionalArrayOfAuthorizations, false],
])

export const isValidCredentialSubject = (value: any): boolean => validateCredentialSubject(value).kind === 'validated'

export const proofMatchesSubject = (proof: ICredentialProof, params: TUnvalidated<IVerifiableCredential>) => {
  switch (proof.data.version) {
    case DataVersions.legacy:
      return proof.data.target.attestationNode.data.data === params.credentialSubject.data
    case DataVersions.onChain:
    case DataVersions.batch:
      return proof.data.target.claimNode.data.data === params.credentialSubject.data
    default:
      return false
  }
}

export const isArrayOfNonEmptyStrings = (value: any): boolean => {
  if (!Array.isArray(value)) return false
  if (value.length === 0) return false
  return value.every(v => HashingValidation.isNotEmptyString(v))
}

export const validateVerifiableCredential = genValidateFn([
  ['id', HashingValidation.isNotEmptyString, false],
  ['type', HashingValidation.isValidTypeString, false],
  ['issuer', EthU.isValidAddress, false],
  ['issuanceDate', HashingValidation.isValidRFC3339DateTime, false],
  ['credentialSubject', isValidCredentialSubject, false],
  ['proof', isValidCredentialProof, false],
  ['proof', proofMatchesSubject, true],
])

export const isArrayOfVerifiableCredentials = (value: any): boolean => {
  if (!Array.isArray(value)) return false
  if (value.length === 0) return false
  return value.every(v => validateVerifiableCredential(v).kind === 'validated')
}

export const validatePresentationProof = genValidateFn([
  ['type', HashingValidation.isNotEmptyString, false],
  ['created', HashingValidation.isValidRFC3339DateTime, false],
  ['creator', EthU.isValidAddress, false],
  ['nonce', HashingValidation.isNotEmptyString, false],
  ['domain', HashingValidation.isNotEmptyString, false],
  ['credentialHash', HashingValidation.isValidHash, false],
])

export const isValidPresentationProof = (value: any): boolean => validatePresentationProof(value).kind === 'validated'

export const proofMatchesCredential = (proof: IPresentationProof, params: TUnvalidated<IVerifiablePresentation>) => {
  return (
    proof.credentialHash.toLowerCase() ===
    HashingLogic.hashMessage(HashingLogic.orderedStringify(params.verifiableCredential))
  )
}

export const packedDataMatchesProof = (packedData: string, params: TUnvalidated<IVerifiablePresentation>) => {
  return packedData.toLowerCase() === HashingLogic.hashMessage(HashingLogic.orderedStringify(params.proof))
  return true
}

export const tokenMatchesProof = (token: string, params: TUnvalidated<IVerifiablePresentation>) => {
  return token.toLowerCase() === params.proof.token.toLowerCase()
}

export const validatePresentationSignature = (signature: string, params: TUnvalidated<IVerifiablePresentation>) => {
  const recoveredSigner = HashingLogic.recoverHashSigner(EthU.toBuffer(params.packedData), signature)
  return recoveredSigner.toLowerCase() === params.proof.creator.toLowerCase()
}

export const validateVerifiablePresentation = genValidateFn([
  ['context', isArrayOfNonEmptyStrings, false],
  ['type', (value: any) => value === 'VerifiablePresentation', false],
  ['verifiableCredential', isArrayOfVerifiableCredentials, false],
  ['proof', isValidPresentationProof, false],
  ['proof', proofMatchesCredential, true],
  ['packedData', packedDataMatchesProof, true],
  ['signature', HashingValidation.isValidSignatureString, false],
  ['signature', validatePresentationSignature, true],
  ['token', tokenMatchesProof, true],
])

export const isValidVerifiablePresentation = (value: any): boolean =>
  validateVerifiablePresentation(value).kind === 'validated'
