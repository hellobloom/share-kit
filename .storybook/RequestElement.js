import React from 'react'

import {renderRequestElement} from '../index'

class RequestElement extends React.Component {
  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }

  renderElement = () => {
    const {requestData, ...options} = this.props
    renderRequestElement(this.containerRef.current, this.props.requestData, options)
  }

  componentDidMount() {
    this.renderElement()
  }

  componentDidUpdate() {
    this.renderElement()
  }

  render() {
    return <div ref={this.containerRef} />
  }
}

export {RequestElement}
