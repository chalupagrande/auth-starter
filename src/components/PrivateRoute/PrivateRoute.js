import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import ls from 'store'
import {serverURL, handleError, signOut} from '../../clientHelpers/clientHelpers'

const PrivateRoute = ({path, component: Component, ...rest})=>{
  return <Route path={path} {...rest}
    render={(props)=>{
      return (
        <Auth {...props}>
          <Component {...props}/>
        </Auth>
      )
  }}/>
}

export default PrivateRoute


class Auth extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      authenticated: false,
      redirect: false,
      redirectTo: '/login'
    }

    let token = ls.get('authentication-token')
    if(token){
      axios({
        method: 'post',
        url:`${serverURL}/api/auth/`,
        headers: {
          Authorization: `Bearer ${token}`
        }, 
        data: {requestedRoute: this.props.match.params.userId}
      })
      .then(r =>{
        if(r.status === 200) this.setState(Object.assign(this.state, {authenticated: true}))
        else this.setState(Object.assign(this.state, {redirect:true}))
      }).catch(err => {
        if(err.request.status === 401){
          alert('You are not authorized to view this page.')
          this.setState(Object.assign(this.state, {redirect: true, redirectTo: '/'}))
        } else if(err.request.status === 403){
          alert(err.request.response)
          signOut()
          this.setState(Object.assign(this.state, {redirect: true, redirectTo: '/'}))
        }
        else handleError(err)
      })
    }
  }

  render(){
    if(this.state.authenticated) return this.props.children
    if(this.state.redirect) return <Redirect to={this.state.redirectTo}/>
    else return <h1>You must login to view this page</h1>
  }
}