import React from 'react'
import {Form} from 'semantic-ui-react'
import Client from '../Client'
import {Redirect} from 'react-router-dom'
import Banner from "./Banner"

class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      redirect: false,
      placeHolder: 'email',
      error: false,
      bannerOption: {
        message: '',
        style: {
          display: 'hidden',
        }
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.saveAndContinue = this.saveAndContinue.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.loginButton = this.loginButton.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleReset() {
    this.setState({
      error: false,
      bannerOption: {
        message: '',
        style: {
          display: 'hidden',
        }
      }
    })
  }

  async saveAndContinue() {
    this.setState({
      trying: true
    })
    const login = await Client.login(this.state.email, this.state.password)
    if (login.data) {
      this.handleReset()
      window.sessionStorage.setItem('userId', login.userId)
      this.setState({
        trying: false,
        redirect: true,
      })
    } else {
      if (login.hasOwnProperty('message') && login.message.length > 0) {
        var errorMessage = login.message
      } else {
        errorMessage = 'Internal server error. Please contact the system administrator.'
      }
      this.setState({
        trying: false,
        error: true,
        bannerOption: {
          message: errorMessage,
          style: {
            position: "relative",
            fontSize: "1.5em"
          }
        }
      })
    }
  }

  loginButton() {
    if (this.state.trying) {
      return <button disabled style={{"marginRight": "5px", "marginLeft": "5px", "width": "240px"}}
                     onClick={this.saveAndContinue}>Authenticating</button>
    } else {
      return <button style={{"marginRight": "5px", "marginLeft": "5px", "width": "240px"}}
                     onClick={this.saveAndContinue}>Login</button>
    }
  }

  render() {
    return (
      <div style={{'outline': '1px solid gray', 'margin': '10% 25%', 'padding': '20px'}}>
        <h1 style={{'textAlign': 'center'}}>Time Tracker</h1>
        {this.state.error ?
          (<div>
            <Banner
              bannerStyle={this.state.bannerOption.style}
              message={this.state.bannerOption.message}
              alertLevel={this.state.bannerOption.alertLevel}
            />
          </div>)
          :
          (<div>
          </div>)
        }
        <br/>
        <Form>
          <Form.Field className='col--xs-12 col--md-offset-3'>
            <label>email</label>
            <input
              type="text"
              name='email'
              placeholder={this.state.placeHolder}
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <div style={{"textAlign": "center"}}>
            {this.loginButton()}
          </div>
        </Form>
        {this.state.redirect ?
          (
            <Redirect to='/'/>
          )
          :
          (
            <div style={{'display': 'none'}}/>
          )
        }
      </div>
    )
  }
}

export default LoginPage
