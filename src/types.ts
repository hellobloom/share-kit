import {AttestationTypeID, HashingLogic} from '@bloomprotocol/attestations-lib'
import {IProof} from 'merkletreejs'

// Request Types

enum Action {
  attestation = 'request_attestation_data',
}

type RequestData = {
  action: Action
  token: string
  url: string
  org_logo_url: string
  org_name: string
  org_usage_policy_url: string
  org_privacy_policy_url: string
  types: (keyof typeof AttestationTypeID)[]
}

enum ErrorCorrectionLevel {
  'L' = 1,
  'M' = 0,
  'Q' = 3,
  'H' = 2,
}

type QROptions = {
  ecLevel: keyof typeof ErrorCorrectionLevel
  size: number
  bgColor: string
  fgColor: string
  hideLogo: boolean
  padding: number
  logoImage?: string
  logoWidth?: number
  logoHeight?: number
  logoOpacity?: number
}

// Response Types

/**
 * Based on IProof from `merkletreejs`, but the data property is a string
 * which should contain the hex string representation of a Buffer for
 * compatibility when serializing / deserializing.
 */
interface IProofShare {
  position: 'left' | 'right'
  data: string
}

/**
 * Represents the data shared by a user, which has been attested on the Bloom Protocol.
 * Receivers of this data can / should verity this data hasn't been tampered with.
 */
interface IVerifiedData {
  /**
   * Blockchain transaction hash which emits the layer2Hash property
   */
  tx: string

  /**
   * Attestation hash that lives on chain and is formed by hashing the merkle
   * tree root hash with a nonce.
   */
  layer2Hash: string

  /**
   * Merkle tree root hash
   */
  rootHash: string

  /**
   * Nonce used to hash the `rootHash` to create the `layer2Hash`
   */
  rootHashNonce: string

  /**
   * Merkle tree leaf proof
   */
  proof: IProofShare[]

  /**
   * The Ethereum network name on which the tx can be found
   */
  stage: 'mainnet' | 'rinkeby' | 'local'

  /**
   * Data node containing the raw verified data that was requested
   */
  target: HashingLogic.IDataNode

  /**
   * Ethereum address of the attester that performed the attestation
   */
  attester: string
}

type ResponseData = {
  /**
   * The Ethereum address of the user sharing their data
   */
  subject: string

  /**
   * Data shared to the receiving endpoint requested by the share-kit QR code.
   * This data can be verified by the receiver via functions in utils.ts.
   */
  data: IVerifiedData[]

  /**
   * Hex string representation of the `data` being keccak256 hashed
   */
  packedData: string

  /**
   * Signature of `packedData` by the user with their mnemonic.
   */
  signature: string

  /**
   * Token that should match the one provided to the share-kit QR code.
   */
  token: string
}

export {Action, RequestData, ErrorCorrectionLevel, QROptions, IProof, IProofShare, IVerifiedData, ResponseData}
