import { createStore } from 'redux'

let s = {
  credentials: {
    fname: null,
    lname: null,
    email: null,
    token: null,
    id: null,
    email_confirmed: false, 
  },
  value: 0
}

const initialState = Object.assign({}, s)

function reducer(state = s, action) {
  switch (action.type) {
    case 'HANDLE_TOKEN':
      let {token, email, fname, lname, id, email_confirmed} = action
      return Object.assign(state, 
        {credentials: {
          token,
          fname, lname,
          email,
          id,
          email_confirmed 
        }})
    case 'SIGN_OUT':
      return Object.assign(state, {credentials: initialState.credentials})
    default:
      return state
  }
}

const store = createStore(  
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;