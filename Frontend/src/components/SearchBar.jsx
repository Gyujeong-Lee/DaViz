import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 1vh;
  margin-bottom: 5vh;
`;

export default function SearchBar() {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');

  const changeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const searchDatasets = () => {
    history.push(`/datalist?q=${searchInput}`);
  };

  return (
    <Searchbar>
      <Stack spacing={3} sx={{ width: 600 }}>
        <TextField
          label="Search input"
          onChange={changeSearchInput}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              searchDatasets();
            }
          }}
        />
      </Stack>
    </Searchbar>
  );
}
