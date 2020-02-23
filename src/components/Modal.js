import React, {Component} from 'react'
import 'semantic-ui-css/semantic.min.css'
import Client from "../Client"

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: true,
      clockIn: props.recordToEdit.clock_in,
      clockOut: props.recordToEdit.clock_out
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      clockIn: props.recordToEdit.clock_in,
      clockOut: props.recordToEdit.clock_out
    })
  }

  handleChange(event) {
    this.setState({clockIn: event.target.value})
    console.log(this.state.clockIn)
  }

  render() {
    return (
      <div>
        {this.state.showModal ? (
          <div class="ui visible content" style={{'border': 'solid 1px', 'height': '300px', 'width': '600px'}}>
            <div className="ui input"><input type="text" value={this.state.clockIn} onChange={this.handleChange}/></div>
            <div className="ui input"><input type="text" value={this.state.clockOut} onChange={this.handleChange}/>
            </div>
            <button className="ui button"
                    onClick={() => {this.setState({showModal: false})
                      Client.editEntry(this.props.recordToEdit.clocking_id, this.state.clockIn, this.state.clockOut)}}>SUBMIT
            </button>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    )
  }
}

export default Modal