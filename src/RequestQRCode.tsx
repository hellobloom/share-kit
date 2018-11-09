import * as React from 'react'

import {RequestData, Options} from './types'
import {generateRequestQRCode} from './generateRequestQRCode'

type RequestQRCodeProps = Partial<Options> & {
  requestData: RequestData
}

class RequestQRCode extends React.Component<RequestQRCodeProps> {
  private canvasRef: React.RefObject<HTMLCanvasElement>

  constructor(props: RequestQRCodeProps) {
    super(props)

    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    if (this.canvasRef.current) {
      const {requestData, ...rest} = this.props
      generateRequestQRCode(this.canvasRef.current, requestData, rest)
    }
  }

  componentDidUpdate() {
    if (this.canvasRef.current) {
      const {requestData, ...rest} = this.props
      generateRequestQRCode(this.canvasRef.current, requestData, rest)
    }
  }

  render() {
    return <canvas ref={this.canvasRef} />
  }
}

export {RequestQRCode}
