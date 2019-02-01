import React from 'react'

import {renderRequestElement} from '../index'

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    const {requestData, ...qrOptions} = this.props
    this.requestElement = renderRequestElement({
      container: this.containerRef.current,
      requestData,
      qrOptions,
      shouldRenderButton: () => true,
    })
  }

  componentDidUpdate(prevProps) {
    const {requestData: prevRequestData, ...prevQROptions} = prevProps
    const {requestData, ...qrOptions} = this.props

    if (prevRequestData !== requestData || prevQROptions !== requestData) {
      this.requestElement.update({requestData, qrOptions})
    }
  }

  componentWillUnmount() {
    this.requestElement.remove()
  }

  render() {
    return <div style={{width: '335px'}} ref={this.containerRef} />
  }
}

export {Button}
