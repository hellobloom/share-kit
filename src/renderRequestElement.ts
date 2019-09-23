import Bowser from 'bowser'

import {QROptions, ButtonOptions, ShouldRenderButton, RequestElementResult, JsonWebTokenConfig} from './types'
import {renderRequestButton} from './elements/renderRequestButton'
import {renderRequestQRCode} from './elements/renderRequestQRCode'

const renderRequestElement = (config: {
  container: HTMLElement
  jwtConfig: JsonWebTokenConfig
  qrOptions?: Partial<QROptions>
  shouldRenderButton?: ShouldRenderButton
  buttonOptions: ButtonOptions
}): RequestElementResult => {
  if (config.shouldRenderButton === undefined) {
    config.shouldRenderButton = parsedResult => {
      const isSupportedPlatform = parsedResult.platform.type === 'mobile' || parsedResult.platform.type === 'tablet'
      const isSupportedOS = parsedResult.os.name === 'iOS' || parsedResult.os.name === 'Android'

      return isSupportedPlatform && isSupportedOS
    }
  }

  const shouldRenderButton = config.shouldRenderButton(Bowser.parse(window.navigator.userAgent))

  if (shouldRenderButton) {
    return renderRequestButton(config)
  } else {
    return renderRequestQRCode(config)
  }
}

export {renderRequestElement}
