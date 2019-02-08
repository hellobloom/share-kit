import React from 'react'

import {renderRequestElement} from '../index'

class Base extends React.Component {
  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    const {requestData, qrOptions, buttonCallbackUrl, shouldRenderButton} = this.props
    this.requestElement = renderRequestElement({
      container: this.containerRef.current,
      requestData,
      qrOptions,
      buttonCallbackUrl,
      shouldRenderButton,
    })
  }

  componentDidUpdate(prevProps) {
    const {requestData: prevRequestData, qrOptions: prevQROptions, buttonCallbackUrl: prevButtonCallbackUrl} = prevProps
    const {requestData, qrOptions, buttonCallbackUrl} = this.props

    if (
      prevRequestData !== requestData ||
      prevQROptions !== requestData ||
      prevButtonCallbackUrl !== buttonCallbackUrl
    ) {
      this.requestElement.update({requestData, qrOptions, buttonCallbackUrl})
    }
  }

  componentWillUnmount() {
    this.requestElement.remove()
  }

  render() {
    return <div ref={this.containerRef} />
  }
}

export {Base}
