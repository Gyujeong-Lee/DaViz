import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import AlbumIcon from '@mui/icons-material/Album';
import { useHistory } from 'react-router';

const Content = styled.div`
  p {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
`;

const PreviewBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  color: #0076be;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #ffffff;
  background-color: #0076be;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  margin-bottom: 0.1rem;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  p {
    // margin-left: 0.5rem;
    align-self: center;
    font-size: 1.25rem;
  }
`;

const Information = styled.div`
  padding-left: 1rem;
  margin: auto;
  color: #0076be;
  background-color: #ffffff;
  min-height: 30px;
  margin-bottom: 0.25rem;
`;

const Description = styled.div`
  align-items: center;
  padding-left: 1rem;
  margin: auto;
  color: #0076be;
  background-color: #ffffff;
  min-height: 40px;
  margin-bottom: 0.25rem;
  p {
    display: flex;
    align-items: center;
    margin: auto;
  }
`;

export default function DataPreview({ data }) {
  const history = useHistory();
  const [columns, setColumns] = useState([]);
  const [columnList, setColumnList] = useState([]);

  useEffect(() => {
    // column 7개 출력
    const column = data.columns.split('|');
    setColumnList(column);
    let columnNames = [];
    if (column.length < 7) {
      columnNames = column.slice(0, column.length - 1).join(', ');
    } else {
      columnNames = column.slice(0, 6).join(', ');
      columnNames += ' ...';
    }
    setColumns(columnNames);
  }, []);

  return (
    <div>
      <PreviewBox>
        <Box
          component="div"
          sx={{
            width: '70%',
            minHeight: 185,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            borderBottom: '3px solid #d3d3d3',
            borderRadius: 1,
            backgroundColor: '#d3d3d3'
          }}
        >
          <Title
            onClick={() => {
              history.push(`/${data.id}/detail`);
            }}
          >
            <div style={{ display: `flex` }}>
              <AlbumIcon sx={{ marginRight: '0.25rem', alignSelf: `center` }} />
              <p>
                {data.id}. {data.title}
              </p>
            </div>
            <p style={{ marginBottom: `0px`, fontSize: `0.5rem` }}>
              {data.created_at.slice(0, 10)}
            </p>
          </Title>
          <Description>
            <Content>
              <p style={{ fontWeight: `bold` }}>Data Description</p>
              <p>{data.description}</p>
            </Content>
          </Description>
          <Information>
            <Content>
              <p style={{ fontWeight: `bold` }}>{columnList.length} Columns</p>
              <p>{columns}</p>
            </Content>
          </Information>
          <Information>
            <Content>
              <p style={{ fontWeight: `bold` }}>{data.row_cnt} Records</p>
            </Content>
          </Information>
        </Box>
      </PreviewBox>
    </div>
  );
}
