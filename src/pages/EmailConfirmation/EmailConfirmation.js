import React from 'react'
import {axiosWCreds, serverURL, handleError} from '../../clientHelpers/clientHelpers'
import {Link, Redirect} from 'react-router-dom'
import store from '../../store'

class EmailConfirmation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false
    }
    this.resendEmail = this.resendEmail.bind(this)
  }

  resendEmail(){
    this.setState({isLoading: true})
    axiosWCreds({
      method: 'post',
      url: `${serverURL}/api/auth/email-confirmation`
    })
    .then(r => {
      alert(`Email Confirmation sent to: ${store.getState().credentials.email}`)
      this.setState({isLoading: false})
    })
    .catch(err => handleError(err))
  }

  render() {
    let s = store.getState()
    if(this.state.isLoading) return <p>Please wait. Sending email...</p>
    if(!s.credentials.token) return <Redirect to='/'/>
    return(
      <div className="email-confirmation">
        <h1>Email Confirmation</h1>
        <p>An email confirmation link has been sent to you at <strong>{s.credentials.email}</strong>. Please click the confirmation link in the email within 10 minutes from the time the email was sent to complete the registration process.</p>
        <p><strong>Note:</strong> Failing to do so could result in being unable to change your email or reset your password. It is important that you complete this step now.</p>

        <h4>Didn't recieve it? </h4>
        <button onClick={this.resendEmail}>Resend Confirmation Email</button>
        <Link to={`/u/${s.credentials.id}`}><button>Continue to Profile</button></Link>
      </div>
    )
  }
}

export default EmailConfirmation