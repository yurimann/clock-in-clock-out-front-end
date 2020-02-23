import React, {Component} from 'react'
import 'semantic-ui-css/semantic.min.css'

class LogButton extends Component {
  render() {
    return (
      <div>
        <button class="ui secondary button">{this.props.message}</button>
      </div>
    )
  }
}

export default LogButton