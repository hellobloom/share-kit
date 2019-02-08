import React from 'react'

import {Base} from './Base'
import {Action} from '../index'

class Updating extends React.Component {
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

  handleUpdate = () => this.setState(prevState => ({counter: prevState.counter + 1}))

  render() {
    return (
      <React.Fragment>
        <Base requestData={this.getData()} />
        <button onClick={this.handleUpdate}>Update RequestQRCode</button>
      </React.Fragment>
    )
  }
}

export {Updating}
