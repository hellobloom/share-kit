import React from 'react'

import {createShareQRCode, removeShareQRCode} from '../index'

class Manager extends React.Component {
  state = {shown: true}

  componentDidMount() {
    this.shareQRCodeId = createShareQRCode({})
  }

  componentDidUpdate() {
    if (this.state.shown) {
      if (this.shareQRCodeId) throw 'Already Created'
      this.shareQRCodeId = createShareQRCode({}, document.body)
    } else {
      removeShareQRCode(this.shareQRCodeId)
      this.shareQRCodeId = undefined
    }
  }

  render() {
    return (
      <button onClick={() => this.setState(prevState => ({shown: !prevState.shown}))}>
        {this.state.shown ? 'Remove' : 'Create'} ShareQRCode
      </button>
    )
  }
}

export {Manager}
