import Bowser from 'bowser'
import {Options as QROptions} from '@bloomprotocol/qr'

import {ButtonOptions, RequestData, ShouldRenderButton, RequestElementResult} from './types'
import {renderRequestButton} from './elements/renderRequestButton'
import {renderRequestQRCode} from './elements/renderRequestQRCode'

export const renderRequestElement = (_config: {
  container: HTMLElement
  requestData: RequestData
  qrOptions?: Partial<QROptions>
  shouldRenderButton?: ShouldRenderButton
  buttonOptions: ButtonOptions
}): RequestElementResult => {
  const {shouldRenderButton, ...config} = _config

  let renderButton: boolean

  if (typeof shouldRenderButton === 'undefined') {
    const parsedResult = Bowser.parse(window.navigator.userAgent)

    const isSupportedPlatform = parsedResult.platform.type === 'mobile' || parsedResult.platform.type === 'tablet'
    const isSupportedOS = parsedResult.os.name === 'iOS' || parsedResult.os.name === 'Android'

    renderButton = isSupportedPlatform && isSupportedOS
  } else if (typeof shouldRenderButton === 'boolean') {
    renderButton = shouldRenderButton
  } else {
    renderButton = shouldRenderButton(Bowser.parse(window.navigator.userAgent))
  }

  return (renderButton ? renderRequestButton : renderRequestQRCode)(config)
}
