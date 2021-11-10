import React, { useEffect } from 'react';
import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedColumnState, detailColumnState } from '../recoil/detailAtom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
  margin-bottom: 10px;
  button {
    margin-right: 10px;
  }
`;

export default function MultipleSelect() {
  // props 받아와서 namess에 지정
  const detailColumns = useRecoilValue(detailColumnState);
  const [selectedColumns, setSelectedColumns] =
    useRecoilState(selectedColumnState);
  const [columns, setColumns] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setColumns(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    console.log(columns, 'set columns');
  };

  const submitSelect = () => {
    setSelectedColumns(columns);
  };

  const resetSelect = () => {
    setColumns(selectedColumns);
  };

  useEffect(() => {
    setColumns(selectedColumns);
  }, [selectedColumns]);

  return (
    <div>
      <ButtonContainer>
        <Button variant="outlined" size="small" onClick={resetSelect}>
          RESET
        </Button>
        <Button variant="outlined" size="small" onClick={submitSelect}>
          APPLY
        </Button>
      </ButtonContainer>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={Array.from(columns)}
          onChange={handleChange}
          input={<OutlinedInput label="Column" />}
          MenuProps={MenuProps}
          renderValue={(selected) =>
            selected.length > 1 ? selected.join(', ') : selected
          }
        >
          {Array.from(detailColumns).map((column) => (
            <MenuItem key={column} value={column}>
              <Checkbox checked={Array.from(columns).indexOf(column) !== -1} />
              <ListItemText primary={column} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
