import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ServiceWorker from './components/ServiceWorker';
import './assets/css/index.css';

ReactDOM.render(
  <main>
    <App />
    <ServiceWorker/>
  </main>, document.getElementById('root'));