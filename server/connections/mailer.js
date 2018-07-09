const nodemailer = require('nodemailer')
const {email_username, email_password, email_host} = require('../serverHelpers/secrets')

const smtpConfig = {
  // service: 'Godaddy',
  host: email_host,
  secure: false,
  port: 587,
  auth: {
      user: email_username,
      pass: email_password
  }
};

const emailDefaults = {
  from: email_username,
  subject: 'TEST EMAIL MESSAGE'
}

const transporter = nodemailer.createTransport(smtpConfig, emailDefaults)

module.exports = transporter
