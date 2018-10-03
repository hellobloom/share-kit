import React from 'react'

import {createRequestQRCode, updateRequestQRCode, removeRequestQRCode} from '../index'

class Manager extends React.Component {
  state = {shown: true, counter: 0}

  mergedData = () => ({counter: this.state.counter, ...this.props.requestData})
  create = () => (this.requestQRCodeId = createRequestQRCode(this.mergedData(), document.body))
  update = () => updateRequestQRCode(this.requestQRCodeId, this.mergedData())
  remove = () => {
    removeRequestQRCode(this.requestQRCodeId)
    this.requestQRCodeId = undefined
  }

  handleShownToggle = () =>
    this.setState(
      prevState => ({shown: !prevState.shown}),
      () => {
        if (this.state.shown) {
          if (this.requestQRCodeId) throw 'Already Created'
          this.create()
        } else {
          this.remove()
        }
      }
    )

  handleUpdate = () => this.setState(prevState => ({counter: prevState.counter + 1}), () => this.update())

  componentDidMount() {
    this.create()
  }

  componentWillUnmount() {
    this.remove()
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleShownToggle}>{this.state.shown ? 'Remove' : 'Create'} RequestQRCode</button>
        <button disabled={!this.state.shown} onClick={this.handleUpdate}>
          Update RequestQRCode
        </button>
      </React.Fragment>
    )
  }
}

export {Manager}
