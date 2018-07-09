// Dependencies
const jwt = require('jsonwebtoken')
const {secret} = require('./secrets')
const {tokenExpirationTime} = require('./config')
const ErrorCodes = require('./ErrorCodes')

/**
  Error handling. Only to be used when the SERVER is experiencing an error. Not 
  to be used when sending back incorrect credential errors and so forth. 

  @param {Object} err : The error object generated.
  @param {Object} res : The response object to send back to the user.
  @param {String} msg : A message that will help identify the origin of the error.
*/
function handleError(err, res, code){
  if(err) {
    console.log(err)
    if(res){
      return res.status(500).send({error: err, message: ErrorCodes[code], code: code})
    }
    debugger;
  }
  return
}

/** 
 *  Signs and sends token back to user
 *
 * @param {Object} user - The user to use to get token information from 
 * @param {Response_Object} res - The response object to send back to the user
*/
function handleToken(user, res){
  let {email, fname, lname, id, email_confirmed} = user
  const token = jwt.sign({email, fname, lname, id, email_confirmed}, secret, {expiresIn: tokenExpirationTime})
  if(!res) Console.warn('NO RESPONSE OBJECT TO SEND BACK')
  else return res.send({token})
  return
}

module.exports = {handleToken, handleError}