'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./connections/db')
const {passport} = require('./middleware')
const AuthRouter = require('./routers/AuthRouter')
const transporter = require('./connections/mailer')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize());

const port = process.env.PORT || 4000;

const frontEndRoutes = ["/", "/login", "/register", "/profile/*", "/reset-password/*", "/token/*", '/forgot-password', '/email-confirmation'];
frontEndRoutes.map(route => app.use(route, express.static("public")));

app.use('/api/auth', AuthRouter)

app.listen(port)
console.log(`listening on ${port}`)