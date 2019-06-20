import {AttestationTypeID} from '@bloomprotocol/attestations-lib'
import Bowser from 'bowser'

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

type ButtonOptions = {
  callbackUrl: string
}

type ShouldRenderButton = (parsedResult: Bowser.Parser.ParsedResult) => boolean

type RequestElementResult = {
  update: (config: {requestData: RequestData; buttonOptions: ButtonOptions; qrOptions?: Partial<QROptions>}) => void
  remove: () => void
}

export {Action, RequestData, ErrorCorrectionLevel, QROptions, ButtonOptions, ShouldRenderButton, RequestElementResult}
