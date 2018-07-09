import React from 'react'
import store from '../../store'
import ls from 'store'

class Profile extends React.Component {
  signOut(){
    ls.remove('authentication-token')
    store.dispatch({type: 'SIGN_OUT'})
  }

  render() {
    console.log(this.props)
    let name = this.props.credentials.fname.charAt(0).toUpperCase() + this.props.credentials.fname.slice(1)
    return(
      <div className="profile">
        <h1>Welcome {name}</h1>
        <button onClick={this.signOut}>Sign Out</button>
      </div>
    )
  }
}

export default Profile