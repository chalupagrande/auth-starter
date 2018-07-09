import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import store from './store'
// import registerServiceWorker from './registerServiceWorker';

store.subscribe(()=> render(App, document.getElementById('root')))
render(App, document.getElementById('root'))

function render(Component, el){
  return ReactDOM.render(<Component/>, el)
}
// registerServiceWorker();
