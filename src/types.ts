import {AttestationTypeID} from '@bloomprotocol/attestations-lib'

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

type Options = {
  size?: number
  bgColor?: string
  fgColor?: string
}

// Response Types

type NonceData = {
  nonce: string
  data: string
  tx: string
  hashes: string[]
}

export interface IAttestationData {
  /**
   * The type of attestation (phone, email, etc.)
   */
  type: keyof typeof AttestationTypeID
  /**
   * Optionally identifies service used to perform attestation
   */
  provider?: string
  // tslint:disable:max-line-length
  /**
   * String representation of the attestations data.
   *
   * ### Examples ###
   * email: "test@bloom.co"
   * sanction-screen: {\"firstName\":\"FIRSTNAME\",\"middleName\":\"MIDDLENAME\",\"lastName\":\"LASTNAME\",\"birthMonth\":1,\"birthDay\":1,\"birthYear\":1900,\"id\":\"a1a1a1a...\"}
   *
   * Any attestation that isn't a single string value will be
   * a JSON string representing the attestation data.
   */
  // tslint:enable:max-line-length
  data: string
  /**
   * Attestation type nonce
   */
  nonce: string
  /**
   * Semantic version used to keep track of attestation versions
   */
  version: string
}

export interface IProofShare {
  position: 'left' | 'right'
  data: string
}

export interface IProof {
  position: 'left' | 'right'
  data: Buffer
}

export interface IVerifiedData {
  tx: string // Blockchain transaction hash which emitted the specified root hash
  stage: 'mainnet' | 'rinkeby' | 'local' // Network on which the tx can be found
  rootHash: string // Root hash of data merkle tree emitted by attestation event in specified transaction
  target: IAttestationData
  proof: IProofShare[]
}

type Nonces = {[P in keyof typeof AttestationTypeID]?: NonceData[]}

type ResponseData = {
  bloom_id: number
  data: IVerifiedData[]
}

export {Action, RequestData, Options, NonceData, Nonces, ResponseData}
