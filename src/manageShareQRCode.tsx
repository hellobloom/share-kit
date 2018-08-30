import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {ShareData, Options} from './types'
import {ShareQRCode} from './ShareQRCode'

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const generateQRWrapperId = () => {
  let rand = ''
  for (var i = 0; i < 4; i++) {
    rand += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return 'bloom-share-qr-code-wrapper-' + rand
}

const createShareQRCode = (shareData: ShareData, container: HTMLElement, options?: Options) => {
  const id = generateQRWrapperId()
  const qrWrapper = document.createElement('div')
  qrWrapper.id = id

  container.appendChild(qrWrapper)

  ReactDOM.render(<ShareQRCode shareData={shareData} {...options} />, qrWrapper)

  return id
}

const updateShareQRCode = (id: string, shareData: ShareData, options?: Options) => {
  const qrWrapper = document.getElementById(id)

  if (!qrWrapper) throw `Could not find the QR Code with the id: ${id}`

  ReactDOM.render(<ShareQRCode shareData={shareData} {...options} />, qrWrapper)
}

const removeShareQRCode = (id: string) => {
  const elem = document.getElementById(id)

  if (!elem) return

  ReactDOM.unmountComponentAtNode(elem)
  elem.remove()
}

export {createShareQRCode, updateShareQRCode, removeShareQRCode}
