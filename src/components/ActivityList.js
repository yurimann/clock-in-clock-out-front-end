import React from 'react'
import PropTypes from 'prop-types'
import Modal from "./Modal"

class ActivityList extends React.Component {
  constructor() {
    super()
    this.generateActivityList = this.generateActivityList.bind(this)
    this.state = {
      recordNumber: '',
      recordToEdit: '',
      showModal: false
    }
  }

  generateHeaders() {
    const list = () => {
      if (this.props.activityList.length > 0) {
        const keyValues = Object.keys(this.props.activityList[0]).map((values) => {
          return <th style={{'border': 'solid 1px'}}>{values}</th>
        })
        return <tr>{keyValues}</tr>
      }
    }

    return (
      list()
    )
  }

  generateActivityList() {
    const list = this.props.activityList.map((data) => {
      const keyValues = Object.keys(data).map((values) => {
        return <td>{data[values]}</td>
      })
      return <tr>{keyValues}
        <button className="ui button" onClick={() => {
          this.setState({recordNumber: keyValues[0].props.children}, () => {
            console.log(keyValues[0])
            this.setState({recordToEdit: keyValues[0]._self.props['activityList'].find(x => x['clocking_id'] === this.state.recordNumber)}, () => {
            })
          })
          this.setState({showModal: true})
        }}>edit
        </button>
      </tr>
    })

    return (
      list
    )
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
          {this.generateHeaders()}
          {this.generateActivityList()}
          </tbody>
        </table>
        {this.state.showModal ? (
          <Modal recordToEdit={this.state.recordToEdit}/>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>

    )
  }
}

ActivityList.propTypes = {
  message: PropTypes.string,
}

export default ActivityList
