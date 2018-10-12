import * as React from 'react'
import {QRCode} from 'react-qrcode-logo'

import {RequestData, Options} from './types'

type RequestQRCodeProps = Options & {
  requestData: RequestData
}

const RequestQRCode: React.SFC<RequestQRCodeProps> = props => (
  <QRCode
    size={props.size}
    bgColor={props.bgColor}
    fgColor={props.fgColor}
    logoImage={props.requestData.org_logo_url}
    ecLevel="L"
    value={JSON.stringify(props.requestData)}
  />
)

RequestQRCode.defaultProps = {
  size: 128,
  bgColor: '#fff',
  fgColor: '#6067f1',
}

export {RequestQRCode}
