import React from 'react'

class Profile extends React.Component {
  render() {
    let name = this.props.credentials.fname.charAt(0).toUpperCase() + this.props.credentials.fname.slice(1)
    return(
      <div className="profile">
        <h1>Welcome {name}</h1>
      </div>
    )
  }
}

export default Profile