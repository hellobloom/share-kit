import {drawQRCode, Options} from '@bloomprotocol/qr'

import {appendQuery} from './append'
import {RequestData, RequestElementResult} from '../types'

// Slightly modified from: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
const copyDataToClipboard = (requestData: RequestData) => {
  const selection = document.getSelection()
  const selected = !selection ? false : selection.rangeCount > 0 ? selection.getRangeAt(0) : false

  const textarea = document.createElement('textarea')
  textarea.value = `'${JSON.stringify(requestData)}'`
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'

  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)

  if (selected && selection) {
    selection.removeAllRanges()
    selection.addRange(selected)
  }
}

export const renderRequestQRCode = (config: {
  container: HTMLElement
  requestData: RequestData
  qrOptions?: Partial<Options>
}): RequestElementResult => {
  const canvas = document.createElement('canvas')
  config.container.append(canvas)

  config.requestData.url = appendQuery(config.requestData.url, {'share-kit-from': 'qr'})
  canvas.onclick = () => copyDataToClipboard(config.requestData)

  const {update, remove} = drawQRCode(canvas, {data: config.requestData, options: config.qrOptions})

  return {
    update: updateConfig => {
      updateConfig.requestData.url = appendQuery(updateConfig.requestData.url, {'share-kit-from': 'qr'})
      canvas.onclick = () => copyDataToClipboard(updateConfig.requestData)

      update({data: updateConfig.requestData, options: updateConfig.qrOptions})
    },
    remove,
  }
}
