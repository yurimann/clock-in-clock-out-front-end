import React, {Component} from 'react'
import 'semantic-ui-css/semantic.min.css'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clockIn: props.recordToEdit.clock_in,
      clockOut: props.recordToEdit.clock_out
    }
    this.handleAssignDate = this.handleAssignDate.bind(this)
  }
  handleChange(event) {
    this.setState({clockIn: event.target.value});
    console.log(this.state.clockIn)
  }
  
  render() {
    return (
      <div class="ui visible content">
        <div className="ui input"><input type="text" value={this.state.clockIn} onChange={this.handleChange} /></div>
        <div className="ui input"><input type="text" value={this.props.recordToEdit['clock_out']} onChange={this.handleChange} /></div>
      </div>
    )
  }
}

export default Modal