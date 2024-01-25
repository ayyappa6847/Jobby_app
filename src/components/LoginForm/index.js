import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errMsg: '',
  }

  renderSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 1,
    })
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.renderSuccessLogin(data.jwt_token)
    } else {
      this.setState({
        showError: true,
        errMsg: data.error_msg,
      })
    }
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderPassword = () => (
    <div>
      <label className="labelLogin" htmlFor="password">
        PASSWORD
      </label>
      <input
        id="password"
        type="password"
        className="loginInput"
        placeholder="Password"
        onChange={this.onChangePassword}
      />
    </div>
  )

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  renderUserName = () => (
    <div>
      <label className="labelLogin" htmlFor="username">
        USERNAME
      </label>
      <input
        id="username"
        type="text"
        className="loginInput"
        placeholder="Username"
        onChange={this.onChangeUsername}
      />
    </div>
  )

  render() {
    const {showError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bgLogin">
        <div className="loginForm">
          <div className="websiteLogoLogin">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <form className="formContainer" onSubmit={this.submitForm}>
            {this.renderUserName()} {this.renderPassword()}
            <button className="loginButton" type="submit">
              Login
            </button>
            {showError && <p className="errorMsg"> {errMsg} </p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
