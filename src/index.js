import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import OfflineMessage from './components/OfflineMessage';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

//OfflineMessage is for showing that internet is lost and we are working offline
ReactDOM.render(
  <React.StrictMode>
    <OfflineMessage />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register({
  onUpdate: registration => {
    //when we change anything in the code or files then it will trigger onUpdate 
    //and we would get new data from network instead of cache
    // window.location = window.location.href;
    //ISSUE : giving blank page after reloading then when we refresh manually, it shows new content

    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }
});