# Notes

1) Change AuthRouter `/` to a `/profile` route. and use the verify Token middleware. This will be used when serving from the server as well..You can eliminate the other logic for verifying the token on the front end. 

- Mailer Response codes: `err.responseCode`
  - 421: too many requests per day
  - 535: Invalid login for emails


### Code Patterns/Style
- `/pages` are top level components that need direct access to the `store`. All other components should receive neccessary props through props.



### Status Codes 
- 500: Something went wrong internally that wasn't supposed to go wrong. Sorry. 
- 400: Bad request. The request didn't contain all the neccessary information to process. Generally Token.
- 401: 
  - Incorrect Credentials: credentials submitted were invalid. Try again. 
  - Email is not confirmed.
- 403: Expired Credentials. Sign out and try again.
- 409: Conflict: This email already exists. 