const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const AuthRouter = express.Router()
const transporter = require('../connections/mailer')
const {passport, verifyAuthenticationToken} = require('../middleware')
const {secret} = require('../serverHelpers/secrets')
const {handleError, handleToken, sendEmailConfirmation} = require('../serverHelpers/serverHelpers')
const emailTemplates = require('../serverHelpers/EmailTemplates')
const {tokenExpirationTime, emailConfirmationTokenExpiration, clientURL, serverURL} = require('../serverHelpers/config')

/**
 * Verifies the users token is valid, and that the route
 * they are trying to access is allowed. 
 * 
 * TODO: Remove check for users specific route. 
 */
AuthRouter.post('/', verifyAuthenticationToken, (req, res)=> {
  let {decodedToken} = req.locals
  //check that the route being requested matches the users own route id
  if(req.body.requestedRoute && (req.body.requestedRoute !== decodedToken.id)) {
    return res.status(401).send('Not authorized for this route.')
  } else return res.send('OK')
})

/**
 * Signs up user. Posts user data from form submission to database, 
 * and triggers an email confirmation message to be sent to the users
 * email.
 */
AuthRouter.post('/register', (req, res, next)=>{
  User.create(req.body, (err, user)=>{
    if(err) {
      if(err.code === 11000) return res.status(409).send("This email already exists")
      else return handleError(err, res, 1000)
    } else {
      handleToken(user, res)
      // ^^ send token back before sending confirmation email

      sendEmailConfirmation(user)
        .then(r => console.log('confirmation email sent'))
        .catch(err => handleError(err, null, 1001))
      return
    }
  })
})

/**
 * Logs in existing user using passport.
 */
AuthRouter.post('/login', (req, res, next)=> {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) return handleError(err, res, 1002)
    else if(!user) return res.status(401).send(info.message)
    else handleToken(user, res)
  })(req, res);
})

/**
 * Changes users email and sends email confirmation to their new email.
 * Decodes token and checks to see if their email has been confirmed before
 * changing email.
 */
AuthRouter.post('/change-email', verifyAuthenticationToken, (req, res)=>{
  let {decodedToken} = req.locals
  // check to see if their email is confirmed 
  if(!decodedToken.email_confirmed) return res.status(403).send('Please confirm your email.')

  // find user and update 
  User.findOneAndUpdate({email: decodedToken.email}, 
                        // ^^ what to look for
                        {$set: {email: req.body.email, email_confirmed: false}},
                        //^^ what to update with
                        {new: true},
                        // ^^ return the new document
    (err, updatedUser)=>{
      if(err) handleError(err, res, 1003)
      else {
        //send new updated token back
        handleToken(updatedUser, res)

        //send confirmation to new email
        sendEmailConfirmation(updatedUser)
          .then(r => console.log(r))
          .catch(err => handleError(err, null, 1004))
      }
    })
})

/**
 * Changes their password, after verifying their existing password 
 * and that their email has been confirmed. 
 */
AuthRouter.post('/change-password', verifyAuthenticationToken, (req, res)=>{
  let {decodedToken} = req.locals
  if(!decodedToken.email_confirmed) return res.status(401).send('Please confirm your email.')

  User.findOne({email: decodedToken.email}, (err, user)=>{
    if(err) return handleError(err, res, 1005)
    else if(!user) return res.status(400).send('User not found')
    else {
      user.comparePassword(req.body['current-password'], (err, isMatch)=>{
        if(err) return handleError(err, res, 1006)
        else if(!isMatch) return res.status(401).send('Incorrect password')
        else {
          //save the password and send refreshed token
          user.password = req.body['new-password']
          user.save((err, updatedUser)=>{
            if(err || !updatedUser) return handleError(err, res, 1007)
            else return handleToken(updatedUser, res)
          })
        }
      })
    }
  })
})

/**
 * Sends email confirmation if the user requests another confirmation email.
 * Used if their email confirmation token has expired. 
 */
AuthRouter.post('/email-confirmation', verifyAuthenticationToken, (req, res)=>{
  let {decodedToken} = req.locals
  sendEmailConfirmation(decodedToken)
    .then(r => res.send('ok'))
    .catch(err => handleError(err, res, 1008))
})

/**
 * Confirms users email, once they have been re-routed back using the 
 * confirmation email link sent to their email. 
 */
AuthRouter.get('/email-confirmation/:token', (req, res)=>{
  let {token} = req.params
  if(!token) res.status(400).send('No token authorization token found to cofirm email.')
  else {
    jwt.verify(token, secret, (err, decoded)=>{
      if(err){
        if(err.message === 'invalid token') res.status(403).send('Invalid Token')
        else if(err.message === "jwt expired") res.redirect(`${clientURL}/error`)
        else return handleError(err, res, 1009)
      } else {
        User.findOneAndUpdate({email: decoded.email}, 
                              {$set: {email_confirmed: true}}, 
                              {new: true}, 
          (err, updatedUser)=>{
            if(err) return handleError(err, res, 1010)
            // sign and send new confirmed email token back
            let {email, fname, lname, id, email_confirmed} = updatedUser
            const signedToken = jwt.sign({email, fname, lname, id, email_confirmed}, secret, {expiresIn: tokenExpirationTime})
            res.redirect(`${clientURL}/token/${signedToken}`)
          })
      }
    })
  }
})

/**
 *  Handles user posting of email information. 
 *  Sends email if user is found with password reset link. 
 *  
 */
AuthRouter.post('/reset-password/', (req, res)=>{
  let {email} = req.body

  User.findOne({email}, (err, user)=>{
    if(err) handleError(err, res, 1011)
    else if(!user) {
      // sends email telling user of password reset attempt on 
      // null email
      transporter.sendMail({
        to: email,
        subject: 'Password Reset',
        html: emailTemplates.userNotFoundHTML(email),
        text: emailTemplates.userNotFoundText(email)
      })
        .then(r => console.log(r))
        .catch(err => handleError(err, null, 1012))
      res.send('Sending Email')

    } else if(!user.email_confirmed){
      res.status(401).send('Email was not confirmed.')
      
    } else {
      // sends email with reset link
      const {email, fname, lname, id, email_confirmed} = user
      const signedToken = jwt.sign({email, fname, lname, id, email_confirmed}, secret, {expiresIn: emailConfirmationTokenExpiration})
      const link = `${serverURL}/api/auth/reset-password/${signedToken}`
      transporter.sendMail({
        to: email,
        subject: 'Password Reset',
        html: emailTemplates.resetPasswordHTML(email, link),
        text: emailTemplates.resetPasswordText(email, link)
      })
        .then(r => console.log(r))
        .catch(err => handleError(err, null, 1012))

      res.send('Sending Email')
    }
  })
})

/**
 * Resets users password. 
 * Fetches user from the database, and updates users password. 
 */
AuthRouter.get('/reset-password/:token', (req, res)=>{
  const {token} = req.params
  jwt.verify(token, secret, (err, decoded)=>{
    if(err){
      if(err.name === "TokenExpiredError") return res.status(403).send('Your link has expired.')
      else return handleError(err, res, 'Error verifying token in middleware')
    } else {
      res.redirect(`${clientURL}/reset-password/${token}`)
    }
  })
})


AuthRouter.put('/reset-password', verifyAuthenticationToken, (req, res)=>{
  const {decodedToken} = req.locals
  User.findOne({email: decodedToken.email}, (err, user)=>{
    if(err) return handleError(err, res, 1013)
    else if(!user) return res.status(401).send('No user found.')
    else {
      user.password = req.body['new-password']
      user.save((err, updatedUser)=>{
        if(err || !updatedUser) return handleError(err, res, 1015)
        else return handleToken(updatedUser, res)
      })
    }
  })
})

module.exports = AuthRouter