import {IProofShare, IVerifiedData, IProof} from './types'
import {HashingLogic} from '@bloomprotocol/attestations-lib'

export const formatProofForVerify = (proof: IProofShare[]): IProof[] => {
  return proof.map(node => {
    return {
      position: node.position,
      data: new Buffer(stripHexPrefix(node.data), 'hex'),
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

export const verifyProof = (data: IVerifiedData): boolean => {
  const targetHash = HashingLogic.hashAttestation(data.target)
  const proof = formatProofForVerify(data.proof)
  return HashingLogic.verifyMerkleProof(
    proof,
    new Buffer(stripHexPrefix(targetHash), 'hex'),
    new Buffer(stripHexPrefix(data.rootHash), 'hex')
  )
}

const stripHexPrefix = (hexStr: string): string => {
  if (hexStr.length < 2) return hexStr
  if (hexStr.slice(0, 2) === '0x') return hexStr.slice(2)
  return hexStr
}
