// Dependencies
const jwt = require('jsonwebtoken')
const {secret} = require('./secrets')
const {tokenExpirationTime} = require('./config')
const ErrorCodes = require('./ErrorCodes')

/**
 * Sends email confirmation link to users email. 
 * @param {object} credentials : Users credentials to sign into the token. 
 */
function sendEmailConfirmation(credentials){
  return new Promise((resolve, reject)=>{
    let {email, fname, lname, id} = credentials
    let tokenToSend = jwt.sign({email, fname, lname, id}, secret, {expiresIn: emailConfirmationTokenExpiration})
    let link = `${serverURL}/api/auth/email-confirmation/${tokenToSend}`
  
    transporter.sendMail({
      to: email,
      subject: 'Confirmation Email',
      html: emailTemplates.confirmationEmailHTML(email, link),
      text: emailTemplates.confirmationEmailText(email, link)
    })
      .then(r => resolve(r))
      .catch(err => reject(err))
  })
}

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

module.exports = {handleToken, handleError, sendEmailConfirmation}