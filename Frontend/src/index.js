import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import { RecoilRoot } from 'recoil';
import App from './App';

axios.defaults.baseURL = 'http://localhost:8080/';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
