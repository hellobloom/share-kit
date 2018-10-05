import {IProofShare, IVerifiedData} from './types'
import { HashingLogic } from '@bloomprotocol/attestations-lib'

export const formatProofForVerify = (proof: IProofShare[]) => {
  return proof.map(node => {
    return {
      position: node.position,
      data: Buffer.from(node.data, 'hex'),
    }
  })
}

export const verifyProof = (data: IVerifiedData): boolean => {
  const targetHash = HashingLogic.hashAttestation(data.target)
  const proof = formatProofForVerify(data.proof)
  return HashingLogic.verifyMerkleProof(proof, Buffer.from(targetHash, 'hex'), Buffer.from(data.rootHash, 'hex'))
}