import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import{ init } from 'emailjs-com';
import './index.css';
import App from './App';
init("user_OCDvSu6Pyxz7Gwe93vE8N");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

