import ls from 'store'
import validator from 'validator'
import axios from 'axios'
import store from '../store'
const serverURL = 'http://localhost:4000'
const clientURL = 'http://localhost:3000'
const axiosWCreds = axios.create()


function parseJWT (token) {
  try{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  } catch(err){
    return false
  }
};

/**
 * Parses JWT and adds it localStorage, set default
 * headers in axios, and dispatches parsed credentials.
 * 
 * @param {JsonWebKey} token : Token to be parsed
 */
function handleToken(token){
  if(token){
    ls.set('authentication-token', token)
    let {email, fname, lname, email_confirmed, id} = parseJWT(token)
    axiosWCreds.defaults.headers.common['Authorization'] = 'Bearer '+ token
    store.dispatch({
      type: 'HANDLE_TOKEN',
      token: token,
      email,
      fname, lname,
      email_confirmed,
      id
    })
  } else {
    signOut()
  }
}

/**
 * Removes token from localStorage, resets axios defaults headers,
 * and clears store of credentials
 */
function signOut(){
  ls.remove('authentication-token')
  axiosWCreds.defaults.headers.common['Authorization'] = null
  store.dispatch({
    type: 'SIGN_OUT'
  })
}

/**
 * Alerts user there was an error, and triggers debugger.
 * 
 * @param {ErrorObject} err 
 */
function handleError(err){
  if(err){    
    console.warn('THERE WAS AN ERROR: ', err)
    alert('There was an error. Please try again later.')
    if(err.request){
      console.log(err.request)
    }
  }
  debugger;
}

// TODO: Make email and password validators stronger. 
function validPassword(password){
  try{
    let pass = validator.trim(password)
    let blacklisted = validator.blacklist(pass, `\\[\\]\\\\<>,/:;"'{}|+=()~`)
    return password.length >= 8 &&
          validator.isAscii(pass) && 
          (blacklisted.length === password.length)
  } catch(err){
    return false
  }
}

function validName(name){
  let blacklisted = validator.blacklist(name, `\\[\\]\\\\<>,/:;"'{}|+=()~`)
  return blacklisted.length === name.length
}

function validEmail(email){
  return validator.isEmail(email)
}

export {
        serverURL,
        clientURL,
        parseJWT,
        handleToken,
        axiosWCreds,
        handleError,
        signOut,
        validName,
        validPassword,
        validEmail
      }