import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import { RecoilRoot } from 'recoil';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import App from './App';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
// 배포용
// axios.defaults.baseURL = 'http://k5f007.p.ssafy.io';

const options = {
  // you can also just use 'bottom center'
  position: 'bottom left',
  timeout: 3000,
  offset: '50px',
  type: 'error',
  // you can also just use 'scale'
  transition: 'scale'
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
