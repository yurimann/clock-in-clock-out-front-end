import React, {Component} from 'react'

class LogButton extends Component {

  render() {
    return (
      <div>
        <button>{this.props.message}</button>
      </div>
    )
  }

}

export default LogButton