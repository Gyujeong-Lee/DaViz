import { React } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import logo from '../images/shinhan_logo.png';
import '../App.css';

const Wrapper = styled.div`
  display: flex-column;
  justify-content: center;
  align-self: center;
  width: 100%;
  height: 100%;
`;

const CustomButton = styled(Button)`
  background-color: #0076be;
`;

export default function NotFound() {
  const history = useHistory();
  const goHome = () => {
    history.push('/');
  };
  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>DaViz</h1>
      </header>
      <body style={{ width: '100%', height: '100%;' }}>
        <Wrapper>
          <h2 style={{ textAlign: 'center' }}>404 Page Not Found</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CustomButton onClick={goHome}>Home으로</CustomButton>
            <CustomButton onClick={history.goBack}>뒤로 가기</CustomButton>
          </div>
        </Wrapper>
      </body>
    </>
  );
}
