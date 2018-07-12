import React from 'react'

const Error = (props) => {
  return (
    <div className="error">
      <h1>Oops...</h1>
      <h3>Something went wrong...</h3>
      <p>We're sorry for the inconvenience. Here are some likely reasons for the error.</p>
      <ul>
        <li><strong>- You were trying to confirm your email address.</strong>
            <p className="indent">
              Login, go to <strong><i>Account</i></strong> &gt; <strong><i>Confirm Email</i></strong> &gt; <strong><i>Resend Confirmation Email</i></strong>. Once you recieve the email, 
              you must click the confirmation link within 10 mintues of the email being sent. This is for your protection and to prevent against attackers trying 
              to get into your account.
            </p>
        </li>
      </ul>
    </div>
  )
}

export default Error