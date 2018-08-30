import React from 'react'

import {createShareQRCode, updateShareQRCode, removeShareQRCode} from '../index'

class Manager extends React.Component {
  state = {shown: true, counter: 0}

  handleShownToggle = () =>
    this.setState(
      prevState => ({shown: !prevState.shown}),
      () => {
        if (this.state.shown) {
          if (this.shareQRCodeId) throw 'Already Created'
          this.shareQRCodeId = createShareQRCode({data: this.state.counter}, document.body)
        } else {
          removeShareQRCode(this.shareQRCodeId)
          this.shareQRCodeId = undefined
        }
      }
    )

  handleUpdate = () =>
    this.setState(
      prevState => ({counter: prevState.counter + 1}),
      () => updateShareQRCode(this.shareQRCodeId, {data: this.state.counter})
    )

  componentDidMount() {
    this.shareQRCodeId = createShareQRCode({data: this.state.counter}, document.body)
  }

  componentWillUnmount() {
    removeShareQRCode(this.shareQRCodeId)
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleShownToggle}>{this.state.shown ? 'Remove' : 'Create'} ShareQRCode</button>
        <button disabled={!this.state.shown} onClick={this.handleUpdate}>
          Update ShareQRCode
        </button>
      </React.Fragment>
    )
  }
}

export {Manager}
