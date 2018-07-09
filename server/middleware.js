const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/UserModel')
const {secret} = require('./serverHelpers/secrets')
const {handleError} = require('./serverHelpers/serverHelpers')


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  // ^^ options for renaming fields
  function(email, password, done) {
    return User.findOne({email})
      .then(user => {
        if(!user) return done(null, false, {message: 'Incorrect Email.'})
        user.comparePassword(password, (err, isMatch)=>{
          if(err) return done(err)
          if(!isMatch) return done(null, false, {message: 'Incorrect Password'})
          return done(null, user, {message: 'Logged in successfully.'})
        })
      })
      .catch(err => done(err))
  }
));

//middleware to protect routes from unAuthorized tokens
function verifyAuthenticationToken(req, res, next){
  try {
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, secret, (err, decoded)=>{
      if(err){
        if(err.name === "TokenExpiredError") return res.status(403).send('Your session has expired.')
        else return handleError(err, res, 'Error verifying token in middleware')
      }
      req.locals = {decodedToken: decoded}
      next()
    })
  } catch(err){
    return res.status(400).send('No authorization header present')
  }
}

module.exports = {passport, verifyAuthenticationToken}

