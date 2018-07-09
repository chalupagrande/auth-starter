import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import Profile from '../../components/Profile/Profile'
import ChangeCredentials from '../../components/ChangeCredentials/ChangeCredentials'
import store from '../../store'


class ProfilePage extends React.Component {
  render() {
    let s = store.getState()
    let accountDetails;
    if(!s.credentials || !s.credentials.token) return <Redirect to='/'/>
    if(!s.credentials.email_confirmed) accountDetails = <Link to='/email-confirmation'><button>Confirm Email</button></Link>
    else accountDetails = <ChangeCredentials credentials={s.credentials} {...this.props}/>
    return(
      <div className="profile">
        <Profile credentials={s.credentials} {...this.props}/>
        {accountDetails}
      </div>
    )
  }
}

export default ProfilePage