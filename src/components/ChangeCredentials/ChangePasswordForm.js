import React from 'react'
import PropTypes from 'prop-types'
import { 
        axiosWCreds,
        serverURL,
        handleError,
        validPassword,
        signOut} from '../../clientHelpers/clientHelpers'

class ChangePasswordForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      'current-password': '',
      'new-password': '',
      'new-password-confirmation': ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  shouldComponentUpdate(np) {
    if(np.credentials && np.credentials.email !== this.props.credentials.email) return true
    return false
  }

  handleChange(e){
    e.preventDefault()
    let id = e.target.id
    let obj = {}
    obj[id] = e.target.value
    this.setState(Object.assign(this.state, obj))
  }

  handleSubmit(e){
    e.preventDefault()
    // check if password and confirmation password match
    if(this.state['new-password'] !== this.state['new-password-confirmation']){
      return alert('Passwords do not match.')
    }
    if(!validPassword(this.state['new-password'])) return alert('Invalid password')

    // send request to change password
    axiosWCreds({
      method: 'post',
      url: `${serverURL}/api/auth/change-password`,
      data: this.state
    })
    .then(r =>{
      alert('Credentials has been changed')
      // handleToken(r.data.token)
      signOut()
    })
    .catch(err => {
      if(err.request.status === 403){
        alert(err.request.response)
        signOut()
      } else if(err.request.status === 401){
        alert(err.request.response)
      }
      else handleError(err)
    })
  }

  render() {
    return(
      <div className="change-password">
        <h3>Change Password!</h3>
        <p>for {this.props.credentials.email}</p>
        <form id="change-password" onSubmit={this.handleSubmit}>
          <label htmlFor="current-password" required>Current Password:</label>
          <input id="current-password" type="password" onChange={this.handleChange}/>
          <label htmlFor="new-password" required>New Password:</label>
          <input id="new-password" type="password" required onChange={this.handleChange}/>
          <label htmlFor="new-password-confirmation">New Password Confirmation:</label>
          <input id="new-password-confirmation" type="password" required onChange={this.handleChange}/>
          <button id="change-password-submit" type="submit">Change Password</button>
        </form>
      </div>
    )
  }
}

ChangePasswordForm.propTypes = {
  credentials: PropTypes.object
}

export default ChangePasswordForm