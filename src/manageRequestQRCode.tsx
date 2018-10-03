import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {RequestData, Options} from './types'
import {RequestQRCode} from './RequestQRCode'

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const generateId = () => {
  let rand = ''
  for (var i = 0; i < 4; i++) {
    rand += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return 'bloom-request-qr-code-' + rand
}

const createRequestQRCode = (requestData: RequestData, container: HTMLElement, options?: Options) => {
  const id = generateId()
  const root = document.createElement('div')
  root.id = id

  container.appendChild(root)

  ReactDOM.render(<RequestQRCode requestData={requestData} {...options} />, root)

  return id
}

const updateRequestQRCode = (id: string, requestData: RequestData, options?: Options) => {
  const root = document.getElementById(id)

  if (!root) throw `Could not find the QR Code with the id: ${id}`

  ReactDOM.render(<RequestQRCode requestData={requestData} {...options} />, root)
}

const removeRequestQRCode = (id: string) => {
  const root = document.getElementById(id)

  if (!root) return

  ReactDOM.unmountComponentAtNode(root)
  root.remove()
}

export {createRequestQRCode, updateRequestQRCode, removeRequestQRCode}
