import {Options, RequestData} from './types'
import {renderRequestButton} from './elements/renderRequestButton'
import {renderRequestQRCode} from './elements/renderRequestQRCode'

const bowser = require('bowser')

// START - DO NOT EXPORT
// These are temporary until bowser defines types
type ParsedResult = {
  browser: Details
  os: OSDetails
  platform: PlatformDetails
  engine: Details
}

type Details = {
  name?: string
  version?: Array<{index: number; input: string} | boolean | string | any>
}

type OSDetails = Details & {
  versionName?: string
}

type PlatformDetails = {
  type?: string
  vendor?: string
  model?: string
}
// END - DO NOT EXPORT

const renderRequestElement = (
  container: HTMLElement,
  data: RequestData,
  options: Partial<Options>,
  shouldRenderButton?: (parsedBrowser: ParsedResult) => boolean
) => {
  if (shouldRenderButton === undefined) {
    shouldRenderButton = (parsedBrowser: ParsedResult) => {
      const isMobile = parsedBrowser.platform.type === 'mobile' || parsedBrowser.platform.type === 'tablet'
      const isIOS = () => parsedBrowser.os.name === 'iOS'

      return isMobile && isIOS()
    }
  }

  if (shouldRenderButton(bowser.parse(window.navigator.userAgent))) {
    renderRequestButton(container, data, options)
  } else {
    renderRequestQRCode(container, data, options)
  }
}

export {renderRequestElement}
