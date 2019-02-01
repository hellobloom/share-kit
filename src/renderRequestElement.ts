import {QROptions, RequestData, ShouldRenderButton, RequestElementResult} from './types'
import {renderRequestButton} from './elements/renderRequestButton'
import {renderRequestQRCode} from './elements/renderRequestQRCode'

const bowser = require('bowser')

const renderRequestElement = (config: {
  container: HTMLElement
  requestData: RequestData
  qrOptions?: Partial<QROptions>
  shouldRenderButton?: ShouldRenderButton
}): RequestElementResult => {
  if (config.shouldRenderButton === undefined) {
    config.shouldRenderButton = parsedResult => {
      const isMobile = parsedResult.platform.type === 'mobile' || parsedResult.platform.type === 'tablet'
      const isIOS = () => parsedResult.os.name === 'iOS'

      return isMobile && isIOS()
    }
  }

  if (config.shouldRenderButton(bowser.parse(window.navigator.userAgent))) {
    return renderRequestButton(config)
  } else {
    return renderRequestQRCode(config)
  }
}

export {renderRequestElement}
