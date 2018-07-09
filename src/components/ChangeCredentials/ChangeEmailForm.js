import React from 'react'
import PropTypes from 'prop-types'

import { 
        axiosWCreds,
        serverURL,
        handleToken,
        handleError,
        validEmail,
        signOut} from '../../clientHelpers/clientHelpers'

class ChangeEmailForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      'email': '',
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
    this.setState({email: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    if(!validEmail(this.state.email)) return alert('Invalid Email')

    axiosWCreds({
      method: 'post',
      url: `${serverURL}/api/auth/change-email`,
      data: this.state
    })
    .then(r =>{
      alert('Credentials has been changed')
      handleToken(r.data.token)
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
      <div className="change-email">
        <h3>Change Email</h3>
        <p>Current Email: <b>{this.props.credentials.email}</b></p>
        <form id="change-email" onSubmit={this.handleSubmit}>
          <label htmlFor="email">New Email:</label>
          <input id="email" type="text" required onChange={this.handleChange}/>
          <button id="change-email-submit"type="submit">Change Email</button>
        </form>
      </div>
    )
  }
}

ChangeEmailForm.propTypes = {
  credentials: PropTypes.object
}

export default ChangeEmailForm