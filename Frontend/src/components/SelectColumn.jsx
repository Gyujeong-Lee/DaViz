import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

const names = [
  'column 1',
  'column 2',
  'column 3',
  'column 4',
  'column 5',
  'column 6',
  'column 7',
  'column 8',
  'column 9',
  'Daviz'
];

function getStyles(name, columnName, theme) {
  return {
    fontWeight:
      columnName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MultipleSelect(props) {
  const theme = useTheme();
  const [columnName, setColumnName] = useState([]);
  // 여기서부터 내가 추가 코드
  // props 받아와서 namess에 지정
  const { namess } = props;
  // undefined 처리하기 위해 setColumns 설정
  const [columns, setColumns] = useState([]);
  console.log('받아온 네임', namess);
  useEffect(() => {
    if (namess === undefined) {
      return;
    }
    setColumns(namess);
    console.log('undefined 넘기고 설정 되었는지', columns);
  }, []);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setColumnName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Choose Column</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={columnName}
          onChange={handleChange}
          input={<OutlinedInput label="Column" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, columnName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
