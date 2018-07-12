import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import store from '../../store'
import Dropdown from '../../components/Dropdown/Dropdown'
import ProfileDropdownMenu from '../../components/ProfileDropdownMenu/ProfileDropdownMenu'
import UserSvg from '../../assets/UserSvg'

import './Menu.css'


class Menu extends React.Component {
  render() {
    /** 
     * If the user is not signed in, display the Login link. 
     * If the user is signed in, display the account tab, which will have
     * a drop down for Account, Profile and Signout (ProfileDropdownMenu)
    */

    let s = store.getState()
    let LoginOrProfileLink
    if(s.credentials.token){
      let Trigger = (props) => <UserSvg fill='white' isHovered={props.isHovered}/>
      let Menu = (props) => <ProfileDropdownMenu profileLink={`/u/${s.credentials.id}`} accountLink={`/account/${s.credentials.id}`}/>
      LoginOrProfileLink = (props) => <Dropdown menu={Menu} 
                                                trigger={Trigger} 
                                                triggerClass='menu-item__element'/>
    } 
    else LoginOrProfileLink = (props) => <NavLink className="menu-item__element" to="/login" tabIndex="0">Login</NavLink>

    return(
      <header className="header">
        <img src="http://placehold.it/50x50" alt="logo"/>
        <ul className="menu">
          <li className="menu-item"><NavLink className="menu-item__element" to="/">Home</NavLink></li>
          <li className="menu-item"><LoginOrProfileLink/></li>
        </ul>
      </header>
    )
  }
}

Menu.propTypes = {
  userId: PropTypes.string
}

export default Menu