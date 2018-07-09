import React from 'react'
import {handleToken, parseJWT} from '../../clientHelpers/clientHelpers'
import {Redirect} from 'react-router-dom'

class CaptureToken extends React.Component {
  constructor(props){
    super(props)
    this.credentials = parseJWT(this.props.match.params.token)
    this.state = {
      redirect: false,
    }

    if(this.credentials && this.credentials.email) handleToken(this.props.match.params.token)
    this.queueRedirect = this.queueRedirect.bind(this)
  }

  queueRedirect(){
    const that = this
    setTimeout(()=>{
      that.setState({redirect: true})
    }, 4000)
  }
  
  render() {
    if(this.state.redirect) return <Redirect to='/'/>
    else if(!this.credentials || !this.credentials.email) {
      this.queueRedirect()
      return <h3>An error occured. Redirecting...</h3>
    } else {
      this.queueRedirect()
      return(
        <div className="confirmed-email">
          <h1>Your email has been confirmed.</h1>
          <p>You will soon be rerouted to the home page.</p>
        </div>
      )
    }
  }
}
export default CaptureToken