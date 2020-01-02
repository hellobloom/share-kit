import Bowser from 'bowser'

import {QROptions, ButtonOptions, RequestData, ShouldRenderButton, RequestElementResult} from './types'
import {renderRequestButton} from './elements/renderRequestButton'
import {renderRequestQRCode} from './elements/renderRequestQRCode'

export const renderRequestElement = (config: {
  container: HTMLElement
  requestData: RequestData
  qrOptions?: Partial<QROptions>
  shouldRenderButton?: ShouldRenderButton
  buttonOptions: ButtonOptions
}): RequestElementResult => {
  if (typeof config.shouldRenderButton === 'undefined') {
    config.shouldRenderButton = parsedResult => {
      const isSupportedPlatform = parsedResult.platform.type === 'mobile' || parsedResult.platform.type === 'tablet'
      const isSupportedOS = parsedResult.os.name === 'iOS' || parsedResult.os.name === 'Android'

      return isSupportedPlatform && isSupportedOS
    }
  }

  let shouldRenderButton: boolean

  if (typeof config.shouldRenderButton === 'boolean') {
    shouldRenderButton = config.shouldRenderButton
  } else {
    shouldRenderButton = config.shouldRenderButton(Bowser.parse(window.navigator.userAgent))
  }

  if (shouldRenderButton) {
    return renderRequestButton(config)
  } else {
    return renderRequestQRCode(config)
  }
}
