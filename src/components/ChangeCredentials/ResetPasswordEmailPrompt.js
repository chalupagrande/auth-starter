import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {validEmail, handleError, serverURL} from '../../clientHelpers/clientHelpers'

class ResetPasswordEmailPrompt extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e){
    this.setState({email: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    if(!validEmail(this.state.email)) return alert('Invalid Email')
    
    axios({
      method: 'post',
      url: `${serverURL}/api/auth/reset-password/`,
      data: {
        email: this.state.email
      }
    })
    .then(r => {
      alert('Email Sent')
      this.setState(Object.assign(this.state, {redirect: true}))
    })
    .catch(err =>{
      handleError(err)
    })
  }

  render() {
    if(this.state.redirect) return <Redirect to='/login'/>
    // TODO: add Captcha
    return(
      <div className="reset-password">
        <p>Please input your email. We will send you an email with a password reset link.</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" onChange={this.handleChange}/>
          <h1>ADD CAPTCHA HERE</h1>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default ResetPasswordEmailPrompt