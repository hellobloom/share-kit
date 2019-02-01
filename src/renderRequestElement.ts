import {QROptions, RequestData, ShouldRenderButton, RequestElementResult} from './types'
import {renderRequestButton} from './elements/renderRequestButton'
import {renderRequestQRCode} from './elements/renderRequestQRCode'

const bowser = require('bowser')

const renderRequestElement = (
  container: HTMLElement,
  data: RequestData,
  qrOptions: Partial<QROptions>,
  shouldRenderButton?: ShouldRenderButton
): RequestElementResult => {
  if (shouldRenderButton === undefined) {
    shouldRenderButton = parsedResult => {
      const isMobile = parsedResult.platform.type === 'mobile' || parsedResult.platform.type === 'tablet'
      const isIOS = () => parsedResult.os.name === 'iOS'

      return isMobile && isIOS()
    }
  }

  if (shouldRenderButton(bowser.parse(window.navigator.userAgent))) {
    return renderRequestButton(container, data)
  } else {
    return renderRequestQRCode(container, data, qrOptions)
  }
}

export {renderRequestElement}
