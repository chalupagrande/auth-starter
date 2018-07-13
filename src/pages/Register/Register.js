import React from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import store from '../../store'
import {serverURL,
        handleToken,
        handleError,
        validName,
        validPassword,
        validEmail
      } from '../../clientHelpers/clientHelpers'


class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clear = this.clear.bind(this)

    // this.form; // added by ref
  }

  /**
   * @param {Array} inputs : Array of inputs to clear. The first of which will recieve focus.
   */
  clear(inputs){

    let toClear = {};
    inputs.forEach(input => {toClear[input] = ''});
    this.setState(toClear);

    this.form.querySelector('input').focus() // should return first input element anyway, since it's querySelector and not querySelectorAll
  }

  handleChange(e){
    let el = e.target
    let obj = {}
    obj[el.id] = el.value
    this.setState(Object.assign(this.state, obj))
  }

  handleSubmit(e){
    e.preventDefault()
    // check if confirmation password matches
    if(this.state.confirm !== this.state.password) return alert('Passwords do not match.')
    if(!validEmail(this.state.email)){
      this.clear(['email', 'password', 'confirm'])
      return alert('Invalid Email')
    }
    if(!validPassword(this.state.password)){
      this.clear(['password', 'confirm'])
      return alert('Invalid password')
    }
    if(!validName(this.state.name)) return alert('Invalid characters found in name.')


    //split name up
    let splitName = this.state.name.split(' ')
    let data = Object.assign(this.state, {fname: splitName[0], lname: splitName.slice(1).join(' ')})
    //send request
    axios({
      method: 'post',
      url: `${serverURL}/api/auth/register`,
      data: data
    })
      .then(r => {
        handleToken(r.data.token)
      })
      .catch(err => {
        if(err.request.status === 409){
          alert("It appears you may already have an account. Try to Login")
        }
        else handleError(err)
      })
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
      <div className="center">
        <h1>Sign Up</h1>
        <form className="form" id="register" onSubmit={this.handleSubmit} ref={n=> this.form = n}>
          <div className="form__input-group">
            <label htmlFor="name">Full Name:</label>
            <input
              id="name"
              type="text"
              required
              onChange={this.handleChange}
              value={this.state.name}/>
          </div>
          <div className="form__input-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              required
              onChange={this.handleChange}
              value={this.state.email}/>
          </div>
          <div className="form__input-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              required
              onChange={this.handleChange}
              value={this.state.password}/>
          </div>
          <div className="form__input-group">
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              id="confirm"
              type="password"
              required
              onChange={this.handleChange}
              value={this.state.confirm}/>
          </div>
          <div className="row">
            <button onClick={this.clear.bind(this, ['name','email', 'password','confirm'])}>Clear</button>
            <button type="submit">Submit</button>
          </div>
        </form>
        <Link to="/login" className="small italic">Already a member? Login here.</Link>
      </div>
    )
  }
}

export default Register;
