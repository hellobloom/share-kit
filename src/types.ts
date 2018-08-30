import {AttestationTypeID} from 'attestations-lib'

// Request Types

enum Action {
  attestation = 'request_attestation_data',
}

type Types = {[P in keyof typeof AttestationTypeID]?: number}

type RequestData = {
  action: Action
  token: string
  url: string
  org_logo_url: string
  org_name: string
  types: Types
}

type Options = {
  size?: number
  bgColor?: string
  fgColor?: string
  renderAs?: 'svg' | 'canvas'
}

// Response Types

type NonceData = {
  nonce: string
  data: string
  tx: string
}

type Nonces = {[P in keyof typeof AttestationTypeID]?: NonceData[]}

type ResponseData = {
  bloom_id: number
  nonces: Nonces
}

export {Action, Types, RequestData, Options, NonceData, Nonces, ResponseData}
