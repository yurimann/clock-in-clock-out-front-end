import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import ClockButton from "./ClockButton"
import LogButton from "./LogButton"

class Home extends Component {
  constructor() {
    super()
    this.state={
      redirect: false
    }
  }

  componentDidMount() {
    const userId = window.sessionStorage.getItem('userId')
    if (
      userId === null ||
      userId === undefined
    ) {
      this.setState({
        redirect: true
      })
    }
  }

componentWillUnmount() {
  window.sessionStorage.removeItem('userId')
}

  render() {

    return (
      <div>
        <ClockButton />
        <div onClick={() => {
          window.sessionStorage.removeItem('userId')
          this.setState({redirect: true})}}>
        <LogButton message={'Log Out'}/>
        </div>
        {this.state.redirect ? (
          <Redirect to="/login" />
        ) : (
          <div style={{ display: 'none' }} />
        )}
      </div>
    )
  }

}

export default Home