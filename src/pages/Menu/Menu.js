import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import store from '../../store'

import './Menu.css'


class Menu extends React.Component {
  render() {
    let s = store.getState()
    let LoginOrProfileLink
    if(s.credentials.token) LoginOrProfileLink = <NavLink to={`/profile/${s.credentials.id}`} tabIndex="0"><li className="menu__item">Profile</li></NavLink>
    else LoginOrProfileLink = <NavLink to="/login" tabIndex="0"><li className="menu__item">Login</li></NavLink>
    return(
      <header className="header">
        <img src="http://placehold.it/50x50" alt="logo"/>
        <ul className="menu">
        <NavLink to="/"><li className="menu__item">Home</li></NavLink>
          {LoginOrProfileLink}
        </ul>
      </header>
    )
  }
}

Menu.propTypes = {
  userId: PropTypes.string
}

export default Menu