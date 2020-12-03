import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import OfflineMessage from './components/OfflineMessage';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

//Render OfflineMessage component for showing the user when they are offline
ReactDOM.render(
  <React.StrictMode>
    <OfflineMessage />
  </React.StrictMode>,
  document.getElementById('internet-lost-message')
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register({
  onUpdate: registration => {
    //when we change anything in the code or files then it will trigger onUpdate 
    //and we would get new data from network instead of cache

    //display notification
    let newContentNotification = document.getElementById('new-content');
    newContentNotification.classList.remove('hidden');
    setTimeout(() => {
      newContentNotification.classList.add('hidden');
    }, 15000);

    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }
});