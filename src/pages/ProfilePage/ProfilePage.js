import React from 'react'
import store from '../../store'
import Profile from '../../components/Profile/Profile'
import Account from '../Account/Account'


class ProfilePage extends React.Component {
  render() {
    let s = store.getState()
    return(
      <div className="profile">
        <Profile credentials={s.credentials} {...this.props}/>
        <Account />
      </div>
    )
  }
}

export default ProfilePage