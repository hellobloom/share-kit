import {TAttestationTypeNames} from '@bloomprotocol/attestations-lib'
import Bowser from 'bowser'

// Request Types

/**
 * @deprecated
 */
export enum Action {
  attestation = 'request_attestation_data',
  authentication = 'authentication',
}

/**
 * @deprecated
 */
type BaseRequestDataV0 = {
  token: string
  url: string
  org_logo_url: string
  org_name: string
  org_usage_policy_url: string
  org_privacy_policy_url: string
}

/**
 * @deprecated
 */
export type RequestDataAttestationV0 = BaseRequestDataV0 & {
  action: Action.attestation
  types: TAttestationTypeNames[]
}

/**
 * @deprecated
 */
export type RequestDataAuthenticationV0 = BaseRequestDataV0 & {
  action: Action.authentication
}

/**
 * @deprecated
 */
export type RequestDataV0 = RequestDataAttestationV0 | RequestDataAuthenticationV0

type BaseRequestData = {
  version: number
}

type RequestDataV1 = BaseRequestData & {
  version: 1
  token: string
  url: string
  payload_url: string
}

export type RequestData = RequestDataV0 | RequestDataV1

// Request Payload Types

export type BasePayloadRequestData = {
  version: number
}

export type DetailedAttestationTypeConfigV1 = {
  name: TAttestationTypeNames
  optional?: boolean
  completed_after?: string
  completed_before?: string
  provider_whitelist?: string[]
  provider_blacklist?: string[]
}

export type BaseRequestPayloadDataV1 = BasePayloadRequestData & {
  version: 1
  org_logo_url: string
  org_name: string
  org_usage_policy_url: string
  org_privacy_policy_url: string
}

export type AttestationRequestPayloadDataV1 = BaseRequestPayloadDataV1 & {
  action: 'attestation'
  types: (TAttestationTypeNames | DetailedAttestationTypeConfigV1)[]
}

export type AuthRequestPayloadDataV1 = BaseRequestPayloadDataV1 & {
  action: 'authentication'
}

export type RequestPayloadDataV1 = AttestationRequestPayloadDataV1 | AuthRequestPayloadDataV1

export type RequestPayloadData = RequestPayloadDataV1

// QR Types

export enum ErrorCorrectionLevel {
  'L' = 1,
  'M' = 0,
  'Q' = 3,
  'H' = 2,
}

export type QROptions = {
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

// Button Types

export type SmallButtonType = 'square' | 'rounded-square' | 'circle' | 'squircle'

export type MediumButtonType = 'log-in' | 'sign-up' | 'connect' | 'bloom' | 'verify'

export type LargeButtonType = 'log-in' | 'sign-up' | 'connect' | 'bloom' | 'verify'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type BaseButtonOptions = {
  callbackUrl: string
  size?: ButtonSize
}

export type SmallButtonOptions = BaseButtonOptions & {
  size: 'sm'
  type: SmallButtonType
  invert?: boolean
}

export type MediumButtonOptions = BaseButtonOptions & {
  size: 'md'
  type?: MediumButtonType
}

export type LargeButtonOptions = BaseButtonOptions & {
  size?: 'lg'
  type?: LargeButtonType
}

export type ButtonOptions = SmallButtonOptions | MediumButtonOptions | LargeButtonOptions

export type ShouldRenderButton = boolean | ((parsedResult: Bowser.Parser.ParsedResult) => boolean)

export type RequestElementResult = {
  update: (config: {requestData: RequestData; buttonOptions: ButtonOptions; qrOptions?: Partial<QROptions>}) => void
  remove: () => void
}
