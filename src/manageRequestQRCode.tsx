import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {RequestData, Options} from './types'
import {RequestQRCode} from './RequestQRCode'

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const deprecationMessage = (functionName: string) => {
  console.groupCollapsed()
  console.warn(`${functionName} is deprecated`)
  console.warn('Either use RequestQRCode if you are using React, or generateQRCode for plain JS usage.')
  console.groupEnd()
}

const generateId = () => {
  let rand = ''
  for (var i = 0; i < 4; i++) {
    rand += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return 'bloom-request-qr-code-' + rand
}

const createRequestQRCode = (requestData: RequestData, container: HTMLElement, options: Partial<Options>) => {
  deprecationMessage('createRequestQRCode')

  const id = generateId()
  const root = document.createElement('div')
  root.id = id

  container.appendChild(root)

  ReactDOM.render(<RequestQRCode requestData={requestData} {...options} />, root)

  return id
}

const updateRequestQRCode = (id: string, requestData: RequestData, options?: Options) => {
  deprecationMessage('updateRequestQRCode')

  const root = document.getElementById(id)

  if (!root) throw `Could not find the QR Code with the id: ${id}`

  ReactDOM.render(<RequestQRCode requestData={requestData} {...options} />, root)
}

const removeRequestQRCode = (id: string) => {
  deprecationMessage('removeRequestQRCode')

  const root = document.getElementById(id)

  if (!root) return

  ReactDOM.unmountComponentAtNode(root)
  root.remove()
}

export {createRequestQRCode, updateRequestQRCode, removeRequestQRCode}
