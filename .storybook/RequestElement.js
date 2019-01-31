import React from 'react'

import {renderRequestElement, Action} from '../index'

class RequestElement extends React.Component {
  state = {counter: 0}

  getData = () => ({
    action: Action.attestation,
    token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
    url: 'https://receive-kit.bloom.co/api/receive',
    org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
    org_name: `Bloom ${this.state.counter}`,
    org_usage_policy_url: 'https://bloom.co/legal/terms',
    org_privacy_policy_url: 'https://bloom.co/legal/privacy',
    types: ['phone', 'email'],
  })

  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.requestElement = renderRequestElement(this.containerRef.current, this.getData(), this.props)
  }

  componentDidUpdate(_, prevState) {
    if (this.state.counter !== prevState.counter) {
      this.requestElement.update(this.getData(), this.props)
    }
  }

  componentWillUnmount() {
    this.requestElement.remove()
  }

  handleUpdate = () => this.setState(prevState => ({counter: prevState.counter + 1}))

  render() {
    return (
      <React.Fragment>
        <div ref={this.containerRef} />
        <button onClick={this.handleUpdate}>Update Element</button>
      </React.Fragment>
    )
  }
}

export {RequestElement}
