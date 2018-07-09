import React from 'react'
import {NavLink} from 'react-router-dom'

class Home extends React.Component {
  render() {
    return(
      <div className="home center">
        <h1>Welcome!</h1>
        <p>
          This is a authentication boiler plate application. It includes: 
          <ul>  
            <li>Registration and Logging In</li>
            <li>Email Verification</li>
            <li>Email and Password Change</li>
            <li>Forgot Password by Email</li>
            <li>User Dashboard page</li>
            <li>Sign Out</li>
          </ul>
        </p>
        <NavLink to="/register"><button className="button">Get Started</button></NavLink>
      </div>
    )
  }
}

export default Home