import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ServiceWorker from './components/ServiceWorker';
import './assets/css/index.css';
// React notifications
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

ReactDOM.render(
  <main>
    <ReactNotification />
    <App />
    <ServiceWorker/>
  </main>, document.getElementById('root'));