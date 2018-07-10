import React from 'react'
import {NavLink} from 'react-router-dom'
import {signOut} from '../../clientHelpers/clientHelpers'
import './ProfileDropdownMenu.css'

class ProfileDropdownMenu extends React.Component {
  render(){
    return (
      <ul className='menu-dropdown'>
        <NavLink to={this.props.profileLink}>Profile</NavLink>
        <NavLink to={this.props.accountLink}>Account</NavLink>
        <li onClick={signOut}>Sign Out</li>
      </ul>
    )
  }
}

  

export default ProfileDropdownMenu