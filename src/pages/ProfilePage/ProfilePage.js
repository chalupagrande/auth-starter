import React from 'react'
import store from '../../store'
import Profile from '../../components/Profile/Profile'
import {Redirect} from 'react-router-dom'


class ProfilePage extends React.Component {
  render() {
    let s = store.getState()
    if(!s.credentials || !s.credentials.token) return <Redirect to='/'/>
    
    return(
      <div className="profile">
        <Profile credentials={s.credentials} {...this.props}/>
      </div>
    )
  }
}

export default ProfilePage