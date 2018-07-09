import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {parseJWT,
        handleError,
        serverURL,
        validPassword
      } from '../../clientHelpers/clientHelpers'

class PasswordReset extends React.Component {
  constructor(props){
    super(props)
    this.token = this.props.match.params.token
    this.credentials = parseJWT(this.token)
    this.state = {
      'new-password': '',
      'new-password-confirmation': '',
      'redirect': false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.queueRedirect = this.queueRedirect.bind(this)
  }

  queueRedirect(){
    const that = this
    setTimeout(()=>{
      that.setState({redirect: true})
    }, 4000)
  }

  handleChange(e){
    e.preventDefault()
    let obj = {}
    obj[e.target.id] = e.target.value
    this.setState(Object.assign(this.state, obj))
  }

  handleSubmit(e){
    e.preventDefault()    
    if(this.state['new-password'] !== this.state['new-password-confirmation']){
      return alert('Passwords do not match.')
    }
    if(!validPassword(this.state['new-password'])) return alert('Invalid password')

    axios({
      method: 'put',
      url: `${serverURL}/api/auth/reset-password`,
      data: this.state,
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
      .then(r => {
        alert('Password reset')
        this.setState(Object.assign(this.state, {redirect: '/login'}))
      })
      .catch(err => {
        if(err.request.status === 403) return alert('Do not use old passwords.')
        else handleError(err)
      })
  }

  render() {
    if(this.state.redirect) return <Redirect to='/login'/>
    else if(!this.credentials || !this.credentials.email){
      this.queueRedirect()
      return <h3>An error occured. Redirecting... </h3>
    } else {
      return (
        <div className="password-reset">
          <h3>Reset Password</h3>
          <p>for {this.credentials.email}</p>
          <form id="password-reset" onSubmit={this.handleSubmit}>
            <label htmlFor="new-password" required>New Password:</label>
            <input id="new-password" type="password" required onChange={this.handleChange}/>
            <label htmlFor="new-password-confirmation">New Password Confirmation:</label>
            <input id="new-password-confirmation" type="password" required onChange={this.handleChange}/>
            <button id="password-reset-submit" type="submit">Reset Password</button>
          </form>
        </div>
      )
    }
  }
}

export default PasswordReset