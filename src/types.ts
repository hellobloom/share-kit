import {TAttestationTypeNames} from '@bloomprotocol/attestations-lib'
import Bowser from 'bowser'

// Request Types

enum Action {
  attestation = 'request_attestation_data',
  authentication = 'authentication',
}

type RequestDataBase = {
  action: keyof typeof Action
  token: string
  url: string
  org_logo_url: string
  org_name: string
  org_usage_policy_url: string
  org_privacy_policy_url: string
}

type RequestDataAttestation = RequestDataBase & {
  action: 'attestation'
  types: TAttestationTypeNames[]
}

type RequestDataAuthentication = RequestDataBase & {
  action: 'authentication'
  types: []
}

type RequestData = RequestDataAttestation | RequestDataAuthentication

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
  update: (config: {requestData: RequestData; buttonOptions: ButtonOptions; qrOptions?: Partial<QROptions>}) => void
  remove: () => void
}

export {
  Action,
  RequestData,
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
