import * as React from 'react'
import {QRCode} from 'react-qrcode-logo'

import {RequestData, Options} from './types'
import {BloomLogo} from './BloomLogo'

type RequestQRCodeProps = Options & {
  requestData: RequestData
}

const RequestQRCode: React.SFC<RequestQRCodeProps> = props => {
  // If hideLogo is true then don't render any logo
  // If logoImage is not set default to BloomLogo with colors matching the rest of the QR code
  // Otherwise display the provided logo
  const logoImage = props.hideLogo
    ? undefined
    : props.logoImage === undefined
      ? BloomLogo.getLogo({fgColor: props.fgColor, bgColor: props.bgColor})
      : props.logoImage

  return <QRCode {...props} logoImage={logoImage} value={JSON.stringify(props.requestData)} />
}

RequestQRCode.defaultProps = {
  size: 128,
  bgColor: '#fff',
  fgColor: '#6067f1',
  hideLogo: false,
  padding: 0,
  ecLevel: 'M',
}

export {RequestQRCode}
