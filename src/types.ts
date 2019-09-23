import Bowser from 'bowser'
import jwt from 'jsonwebtoken'
import {TAttestationTypeNames} from '@bloomprotocol/attestations-lib'

enum Action {
  attestation = 'request_attestation_data',
}

type BaseRequestData = {
  version: number
}

type RequestDataV1 = BaseRequestData & {
  version: 1
  action: Action
  token: string
  url: string
  payload_url: string
}

type RequestData = RequestDataV1

type BaseRequestDataPayload = {
  version: number
}

type DetailedAttestationTypeConfig = {
  name: string
  optional?: boolean
  completed_after?: string
  completed_before?: string
  provider_whitelist?: string[]
  provider_blacklist?: string[]
}

type RequestDataPayloadV1 = BaseRequestDataPayload & {
  version: 1
  org_logo_url: string
  org_name: string
  org_usage_policy_url: string
  org_privacy_policy_url: string
  types: (TAttestationTypeNames | DetailedAttestationTypeConfig)[]
}

type RequestDataPayload = RequestDataPayloadV1

type JsonWebTokenConfig = {
  token: string
  secretOrPublicKey: string | Buffer
  options?: jwt.VerifyOptions
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

type SmallButtonType = 'square' | 'rounded-square' | 'circle' | 'squircle'

type MediumButtonType = 'log-in' | 'sign-up' | 'connect' | 'bloom' | 'verify'

type LargeButtonType = 'log-in' | 'sign-up' | 'connect' | 'bloom' | 'verify'

type ButtonSize = 'sm' | 'md' | 'lg'

type BaseButtonOptions = {
  callbackUrl: string
  size?: ButtonSize
}

type SmallButtonOptions = BaseButtonOptions & {
  size: 'sm'
  type: SmallButtonType
  invert?: boolean
}

type MediumButtonOptions = BaseButtonOptions & {
  size: 'md'
  type?: MediumButtonType
}

type LargeButtonOptions = BaseButtonOptions & {
  size?: 'lg'
  type?: LargeButtonType
}

type ButtonOptions = SmallButtonOptions | MediumButtonOptions | LargeButtonOptions

type ShouldRenderButton = (parsedResult: Bowser.Parser.ParsedResult) => boolean

type RequestElementResult = {
  update: (config: {jwtConfig: JsonWebTokenConfig; buttonOptions: ButtonOptions; qrOptions?: Partial<QROptions>}) => void
  remove: () => void
}

export {
  Action,
  RequestData,
  RequestDataPayload,
  JsonWebTokenConfig,
  ErrorCorrectionLevel,
  QROptions,
  SmallButtonType,
  MediumButtonType,
  LargeButtonType,
  ButtonSize,
  SmallButtonOptions,
  MediumButtonOptions,
  LargeButtonOptions,
  ButtonOptions,
  ShouldRenderButton,
  RequestElementResult,
}
