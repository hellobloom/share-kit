import React from 'react'
import {Base} from './Base'

class Logo extends React.Component {
  state = {
    hideLogo: false,
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.hideLogo}
          onChange={() => this.setState({hideLogo: !this.state.hideLogo})}
        />
        <label>Hide center logo</label>
        <br />
        <Base qrOptions={{...(props.qrOptions || {}), hideLogo: this.state.hideLogo}} {...props} />
      </div>
    )
  }
}

export {Logo}
