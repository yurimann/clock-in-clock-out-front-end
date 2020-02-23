import React from 'react'
import PropTypes from 'prop-types'
import BannerMessageComponent from './BannerMessage'
import Client from "../Client"
import ActivityList from "./ActivityList"

class ClockButton extends React.Component {
  constructor(props) {
    super(props)
    this.generateClockButton = this.generateClockButton.bind(this)
    this.handleClockCall = this.handleClockCall.bind(this)
    this.state = {
      clockStatus: 'Clock',
      activityList: []
    }
  }

  componentDidMount() {
    Client.userLogs(window.sessionStorage.getItem('userId')).then((data) => {
      this.setState({activityList: data})
    })
  }

  handleClockCall() {
    Client.clock().then((resp) => {
      if (resp.data.clock_out === null || resp.data.clock_out === '') {
        this.setState({clockStatus: 'Clock In'})
      } else this.setState({clockStatus: 'Clock Out'})
    })
    Client.userLogs(window.sessionStorage.getItem('userId')).then(activities => {
      this.setState({activityList: activities})
    })
  }

  generateClockButton() {
    return (
      <button onClick={this.handleClockCall}>
        <BannerMessageComponent message={this.state.clockStatus}/>
      </button>
    )
  }


  render() {
    return (
      <div>
        {this.generateClockButton()}
        <ActivityList activityList={this.state.activityList}/>
      </div>
    )
  }
}

ClockButton.propTypes = {
  message: PropTypes.string,
}

export default ClockButton
