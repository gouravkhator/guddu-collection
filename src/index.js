import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function getConfirmationAndReload() {
  if (window.confirm('New Content is available!. Click Ok to refresh')) {
    window.location.reload();
  }
}

serviceWorkerRegistration.register({
  onUpdate: registration => {
    //when we change anything in the code or files then it will trigger onUpdate 
    //and we would get new data from network instead of cache
    getConfirmationAndReload();
    registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  }
});