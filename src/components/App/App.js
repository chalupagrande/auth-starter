import React from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import ls from 'store'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import Menu from '../../pages/Menu/Menu'
import Home from '../Home/Home'
import CaptureToken from '../CaptureToken/CaptureToken'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import NoMatch from '../NoMatch/NoMatch'
import EmailConfirmation from '../../pages/EmailConfirmation/EmailConfirmation'
import ResetPasswordEmailPrompt from '../ChangeCredentials/ResetPasswordEmailPrompt';
import PasswordReset from '../ChangeCredentials/PasswordReset';
import '../../styles/reset.css'
import '../../styles/globals.css'

import { handleToken } from '../../clientHelpers/clientHelpers';

class App extends React.Component {
  constructor(props){
    super(props)

    //handle token if it is already in localstorage
    let token = ls.get('authentication-token')
    if(token) handleToken(token)
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <div className="wrapper">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/token/:token" component={CaptureToken}/>
              <Route path="/forgot-password" component={ResetPasswordEmailPrompt}/>
              <Route path="/reset-password/:token" component={PasswordReset}/>
              <PrivateRoute path="/email-confirmation" component={EmailConfirmation}/>
              <PrivateRoute path='/profile/:userId' component={ProfilePage}/>
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
