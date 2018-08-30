import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {ShareData, OptionsWithContainer} from './types'
import {ShareQRCode} from './ShareQRCode'

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const generateQRWrapperId = () => {
  let rand = ''
  for (var i = 0; i < 4; i++) {
    rand += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return 'bloom-share-qr-code-wrapper-' + rand
}

const createShareQRCode = (shareData: ShareData, options?: OptionsWithContainer) => {
  const qrWrapperId = generateQRWrapperId()
  const qrWrapper = document.createElement('div')
  qrWrapper.id = qrWrapperId

  const container = options && options.container ? options.container : document.body

  container.appendChild(qrWrapper)

  ReactDOM.render(<ShareQRCode shareData={shareData} {...options} />, qrWrapper)

  return qrWrapperId
}

const removeShareQRCode = (qrWrapperId: string) => {
  const elem = document.getElementById(qrWrapperId)

  if (!elem) return

  ReactDOM.unmountComponentAtNode(elem)
  elem.remove()
}

export {createShareQRCode, removeShareQRCode}
