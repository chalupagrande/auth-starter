import React from 'react'
import {NavLink} from 'react-router-dom'
import {signOut} from '../../clientHelpers/clientHelpers'
import './ProfileDropdownMenu.css'

class ProfileDropdownMenu extends React.Component {
  render(){
    return (
      <ul className='menu-dropdown'>
        <li><NavLink to={this.props.profileLink}>Profile</NavLink></li>
        <li><NavLink to={this.props.accountLink}>Account</NavLink></li>
        <li onClick={signOut}><a>Sign Out</a></li>
      </ul>
    )
  }
}

  

export default ProfileDropdownMenu