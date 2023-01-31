import React from'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {WelcomePage} from './Component/Page.js';
import {WelcomePageImage} from './Component/Page.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WelcomePage>
    
      </WelcomePage>

      <WelcomePageImage/> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
