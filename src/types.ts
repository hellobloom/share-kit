import Bowser from 'bowser'

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
