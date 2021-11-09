import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import { RecoilRoot } from 'recoil';
import App from './App';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
// 배포용
// axios.defaults.baseURL = 'http://k5f007.p.ssafy.io';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
