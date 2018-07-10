import React from 'react'
import axios from 'axios'
import validator from 'validator'
import {Link, Redirect} from 'react-router-dom'
import {serverURL, handleToken, handleError} from '../../clientHelpers/clientHelpers'
import store from '../../store'
import './Login.css'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.passwordInput; // added by ref
  }
  
  handleChange(e){
    let obj = {}
    obj[e.target.id] = e.target.value
    this.setState(Object.assign(this.state, obj))
  }

  handleSubmit(e){
    e.preventDefault()
    if(validator.isEmail(this.state.email)){
      axios({
        method: 'post',
        url: `${serverURL}/api/auth/login`,
        data: this.state
      })
      .then(r => {
        handleToken(r.data.token)
      })
      .catch(err => {
        //incorrect email or password
        if(err.request.status === 401) {
          alert('Incorrect credentials.')
          this.passwordInput.value = ''
          this.passwordInput.focus()
        } 
        else handleError(err)
      })
    } else {
      alert('Invalid Email')
    }
  }

  render() {
    // if we already have credentials saved, redirect to profile
    const s = store.getState()
    if(s && s.credentials.token){
      if(s.credentials.email_confirmed) {
        // if their email is confirmed, redirect them to profile
        return <Redirect to={`/u/${s.credentials.id}`}/>
      } else {
        //otherwise redirect them to email confirmation page
        return <Redirect to={`/email-confirmation`}/>
      }
    }

    return(
      <div className="login center">
        <h1>Login</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__input-group">
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" size="30" onChange={this.handleChange} tabIndex='1'/>
          </div>
          <div className="form__input-group">
            <div className="password-label">
              <label htmlFor="password">Password:</label>
              <Link to='/forgot-password' className="forgot-password" tabIndex='2'>Forgot Password</Link>
            </div>
            <input id="password" type="password" size="30" onChange={this.handleChange} ref={n=> this.passwordInput = n} tabIndex='1'/>
          
          </div>
          <button type="submit" tabIndex='1'>Submit</button>
        </form>
        <Link to='/register' className="small italic" tabIndex='1'>Not yet a member? Register here!</Link>
      </div>
    )
  }
}


export default Login