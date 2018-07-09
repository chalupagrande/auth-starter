import React from 'react'
import {axiosWCreds, serverURL, handleError} from '../../clientHelpers/clientHelpers'
import {Link} from 'react-router-dom'
import store from '../../store'

class EmailConfirmation extends React.Component {
  constructor(props){
    super(props)
    this.resendEmail = this.resendEmail.bind(this)
  }

  resendEmail(){
    axiosWCreds({
      method: 'post',
      url: `${serverURL}/api/auth/email-confirmation`
    })
    .then(r => alert(`Email Confirmation sent to: ${store.getState().credentials.email}`))
    .catch(err => handleError(err))
  }

  render() {
    let s = store.getState()
    return(
      <div className="email-confirmation">
        <h1>Email Confirmation</h1>
        <p>An email confirmation link has been sent to you at <strong>{s.credentials.email}</strong>. Please click the confirmation link in the email within the next 10 minutes to complete the registration process.</p>
        <p><strong>Note:</strong> Failing to do so could result in being unable to change your email or reset your password. It is important that you complete this step now.</p>

        <h4>Didn't recieve it? </h4>
        <button onClick={this.resendEmail}>Resend Confirmation Email</button>
        <Link to={`/profile/${s.credentials.id}`}><button>Continue to Profile</button></Link>
      </div>
    )
  }
}

export default EmailConfirmation