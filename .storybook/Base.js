import React from 'react'

import {renderRequestElement} from '../index'

class Base extends React.Component {
  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    const {requestData, ...qrOptions} = this.props
    console.log({qrOptions})
    this.requestElement = renderRequestElement({container: this.containerRef.current, requestData, qrOptions})
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
    return <div ref={this.containerRef} />
  }
}

export {Base}
