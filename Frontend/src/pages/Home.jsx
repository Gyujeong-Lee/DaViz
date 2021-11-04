import { React } from 'react';
import { useHistory } from 'react-router';
import Stack from '@mui/material/Stack';
import ButtonUnstyled, {
  buttonUnstyledClasses
} from '@mui/core/ButtonUnstyled';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { homestate } from '../state';
import logo from '../images/shinhan_logo.png';
import SearchBar from '../components/SearchBar';
import FileAddForm from '../components/FileAddForm';
import '../App.css';

const CustomButtonRoot = styled('button')`
  background-color: #007fff;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 545;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 18px;
  text-transform: upperCase;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;
  width: 200px;
  height: 200px;

  &:hover {
    background-color: #0059b2;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #004386;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;

const Midbutton = styled(Stack)`
  display: flex;
  align-items: center;
  margin: auto;
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

export default function Home() {
  const history = useHistory();
  const [uploadModal, setUploadModal] = useRecoilState(homestate);

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>DaViz</h1>
      </header>
      <div>
        <SearchBar />
        <Midbutton>
          <Stack spacing={25} direction="row">
            <CustomButton
              onClick={() => {
                history.push('/datalist/');
              }}
            >
              Data List
            </CustomButton>
            <CustomButton
              onClick={() => {
                setUploadModal(true);
              }}
            >
              Data Regist
            </CustomButton>
          </Stack>
          {uploadModal && (
            <FileAddForm
              uploadModal={uploadModal}
              setUploadModal={setUploadModal}
            />
          )}
        </Midbutton>
      </div>
    </>
  );
}
