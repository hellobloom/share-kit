import * as React from 'react'
import QRCode from 'qrcode.react'

import {RequestData, Options} from './types'

type RequestQRCodeProps = Options & {
  requestData: RequestData
}

const RequestQRCode: React.SFC<RequestQRCodeProps> = props => (
  <QRCode
    size={props.size}
    bgColor={props.bgColor}
    fgColor={props.fgColor}
    renderAs={props.renderAs}
    level="L"
    value={JSON.stringify(props.requestData)}
  />
)

RequestQRCode.defaultProps = {
  size: 128,
  bgColor: '#fff',
  fgColor: '#6067f1',
  renderAs: 'svg',
}

export {RequestQRCode}
