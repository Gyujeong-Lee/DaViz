import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedColumnState,
  detailColumnState,
  detailDataState,
  filterConditionState,
  originColumnState
} from '../recoil/detailAtom';

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

export default function MultipleSelect({ id }) {
  const detailColumns = useRecoilValue(detailColumnState);
  const [selectedColumns, setSelectedColumns] =
    useRecoilState(selectedColumnState);
  const [columns, setColumns] = React.useState([]);
  const setDetailDatas = useSetRecoilState(detailDataState);
  const setOriginColumnDatas = useSetRecoilState(originColumnState);
  const setFilterCondition = useSetRecoilState(filterConditionState);
  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setColumns(typeof value === 'string' ? value.split(',') : value);
  };

  const submitSelect = async () => {
    setSelectedColumns(columns);
    let filterCondition = '';
    for (let i = 0; i < columns.length; i++) {
      if (i === columns.length - 1) {
        filterCondition += `${columns[i]}=00`;
      } else {
        filterCondition += `${columns[i]}=00&`;
      }
    }
    setFilterCondition(filterCondition.split('&'));
    await axios
      .get(`/datasets/${id}/filter/${filterCondition}`)
      .then((res) => {
        let tmp = res.data.data;
        if (typeof tmp === 'string') {
          tmp = JSON.parse([res.data.data]);
        }
        const tempDetail = [];
        if (tmp !== undefined) {
          for (let i = 0; i < tmp.length; i++) {
            const data = {
              xAxis: tmp[i].x_axis.split('|'),
              yAxis: tmp[i].y_axis.split('|'),
              detailBoxPlot: [
                tmp[i].min_val,
                tmp[i].max_val,
                tmp[i].q1,
                tmp[i].q2,
                tmp[i].q3
              ],
              ...tmp[i]
            };
            tempDetail.push(data);
          }
          setDetailDatas(tempDetail);
          setOriginColumnDatas(tempDetail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          Cancel
        </Button>
        <Button variant="outlined" size="small" onClick={submitSelect}>
          APPLY
        </Button>
      </ButtonContainer>
      <FormControl sx={{ m: 1, width: 500 }}>
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
