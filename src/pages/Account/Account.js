import React from 'react'
import store from '../../store'
import {Redirect, Link} from 'react-router-dom'
import ChangeCredentials from '../../components/ChangeCredentials/ChangeCredentials'
import Profile from '../../components/Profile/Profile'


class Account extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    let s = store.getState()
    let accountDetails;
    if(!s.credentials || !s.credentials.token) return <Redirect to='/'/>
    if(!s.credentials.email_confirmed) accountDetails = <Link to='/email-confirmation'><button>Confirm Email</button></Link>
    else accountDetails = <ChangeCredentials credentials={s.credentials} {...this.props}/>
    return(
      <div className="account">
        {accountDetails}
      </div>
    )
  }
}

export default Account