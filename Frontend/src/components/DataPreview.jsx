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
  justify-content: flex-start;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #ffffff;
  background-color: #0076be;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  margin-bottom: 0.1rem;
  p {
    margin-left: 0.5rem;
    align-self: center;
    font-size: 1.25rem;
  }
`;

const Information = styled.div`
  padding-left: 1rem;
  font-weight: bold;
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

const Updated = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.7rem;
  color: #000000;
  background-color: #ffffff;
  min-height: 15px;
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
            backgroundColor: '#d3d3d3',
            '&:hover': {
              cursor: 'pointer',
              opacity: [0.9]
            }
          }}
          onClick={() => {
            history.push(`/${data.id}/detail`);
          }}
        >
          <Title>
            <AlbumIcon />
            <p>
              {data.id}. {data.title}
            </p>
            <p>{data.created_at.slice(0, 10)}</p>
          </Title>
          <Information>
            <Content>
              <p>Columns ({columnList.length})</p>
              <p>{columns}</p>
            </Content>
          </Information>
          <Description>
            <Content>
              <p style={{ weight: `bold` }}>Data Description</p>
              <p>{data.description}</p>
            </Content>
          </Description>
          <Updated>
            <p>Created At</p>
            <p>{data.created_at.slice(0, 10)}</p>
          </Updated>
        </Box>
      </PreviewBox>
    </div>
  );
}
