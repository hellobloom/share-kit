import * as React from 'react'
import QRCode from 'qrcode.react'

import {ShareData, Options} from './types'

type ShareQRCodeProps = Options & {
  shareData: ShareData
}

const ShareQRCode: React.SFC<ShareQRCodeProps> = props => (
  <QRCode
    size={props.size}
    bgColor={props.bgColor}
    fgColor={props.fgColor}
    renderAs={props.renderAs}
    level="H"
    value={JSON.stringify(props.shareData)}
  />
)

ShareQRCode.defaultProps = {
  size: 128,
  bgColor: '#fff',
  fgColor: '#6067f1',
  renderAs: 'svg',
}

export {ShareQRCode}
