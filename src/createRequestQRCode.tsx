import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {RequestData, OptionsWithContainer} from './types'
import {RequestQRCode} from './RequestQRCode'

const createRequestQRCode = (
  requestData: RequestData,
  options?: OptionsWithContainer
) => {
  const qrWrapper = document.createElement('div')
  qrWrapper.id = 'bloom-request-qr-code-wrapper'

  const container =
    options && options.container ? options.container : document.body
  container.appendChild(qrWrapper)

  ReactDOM.render(
    <RequestQRCode requestData={requestData} {...options} />,
    container
  )
}

export {createRequestQRCode}
