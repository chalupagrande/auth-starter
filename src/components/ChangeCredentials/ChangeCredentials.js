import React from 'react'
import PropTypes from 'prop-types'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeEmailForm from './ChangeEmailForm'

class ChangeCredentials extends React.Component {
  render() {
    return(
      <div className="change-credentials">
        <ChangeEmailForm credentials={this.props.credentials}/>
        <ChangePasswordForm credentials={this.props.credentials}/>
        <h1>ADD CAPTCHA HERE </h1>
      </div>
    )
  }
}

ChangeCredentials.propTypes = {
  credentials: PropTypes.object
}

export default ChangeCredentials