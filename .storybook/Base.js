import React from 'react'

import {renderRequestElement} from '../src/index'

class Base extends React.Component {
  constructor(props) {
    super(props)

    this.container = null
    this.requestElement = null
  }

  componentDidMount() {
    if (!this.container) return

    const {requestData, qrOptions, buttonOptions, shouldRenderButton} = this.props
    this.requestElement = renderRequestElement({
      container: this.container,
      requestData,
      qrOptions,
      buttonOptions,
      shouldRenderButton,
    })
  }

  componentDidUpdate(prevProps) {
    if (!this.requestElement) return

    const {requestData: prevRequestData, qrOptions: prevQROptions, buttonOptions: prevButtonOptions} = prevProps
    const {requestData, qrOptions, buttonOptions} = this.props

    if (prevRequestData !== requestData || prevQROptions !== requestData || prevButtonOptions !== buttonOptions) {
      this.requestElement.update({requestData, qrOptions, buttonOptions})
    }
  }

  componentWillUnmount() {
    if (this.requestElement) {
      this.requestElement.remove()
    }
  }

  render() {
    return (
      <div
        ref={element => {
          this.container = element
        }}
      />
    )
  }
}

export {Base}
