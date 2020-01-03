import {drawQRCode, Options} from '@bloomprotocol/qr'

import {copyToClipboard} from './utils'
import {RequestData, RequestElementResult} from '../types'
import {appendQuery} from '../append'

export const renderRequestQRCode = (config: {
  container: HTMLElement
  requestData: RequestData
  qrOptions?: Partial<Options>
}): RequestElementResult => {
  config.requestData.url = appendQuery(config.requestData.url, {'share-kit-from': 'qr'})

  const canvas = document.createElement('canvas')
  canvas.onclick = () => copyToClipboard("'" + JSON.stringify(config.requestData) + "'")

  const {update, remove} = drawQRCode(canvas, {data: config.requestData, options: config.qrOptions})

  config.container.append(canvas)

  return {
    update: updateConfig => {
      updateConfig.requestData.url = appendQuery(updateConfig.requestData.url, {'share-kit-from': 'qr'})

      canvas.onclick = () => copyToClipboard("'" + JSON.stringify(updateConfig.requestData) + "'")
      update({data: updateConfig.requestData, options: updateConfig.qrOptions})
    },
    remove: () => {
      console.log('remove')
      remove()
    },
  }
}
