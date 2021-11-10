import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useAlert } from 'react-alert';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { useRecoilState } from 'recoil';
import { uploadState, loadingstate } from '../recoil/homeAtom';
import Loading from './Loading';

const MainTitle = styled(DialogTitle)`
  display: flex;
  justify-content: center;
`;

const UploadFormMargin = styled(DialogContent)`
  margin-top: 3vh;
`;

export default function FileAddForm() {
  const history = useHistory();
  const [loading, setLoading] = useRecoilState(loadingstate);
  const [uploadModal, setUploadModal] = useRecoilState(uploadState);
  const [buttonActive, setButtonActive] = useState(true);
  const [requestData, setRequestData] = useState({
    title: '',
    description: '',
    file: []
  });

  const alert = useAlert();
  const handleAdd = (newFiles) => {
    setRequestData({
      ...requestData,
      file: newFiles
    });
    setButtonActive(false);
  };

  const handleDelete = () => {
    setRequestData({
      ...requestData,
      file: []
    });
    setButtonActive(true);
  };

  const handleClickOpen = () => {
    setUploadModal(true);
    setButtonActive(true);
  };

  const handleClose = () => {
    setUploadModal(false);
    setButtonActive(false);
  };

  useEffect(() => {
    if (uploadModal === true) {
      handleClickOpen();
    } else {
      handleClose();
    }
    return () => {
      handleClose();
    };
  }, [uploadModal]);

  const changeTitle = (e) => {
    setRequestData({
      ...requestData,
      title: e.target.value
    });
  };

  const changeDescription = (e) => {
    setRequestData({
      ...requestData,
      description: e.target.value
    });
  };

  const submitData = () => {
    const formData = new FormData();
    formData.append('title', requestData.title);
    formData.append('description', requestData.description);
    formData.append('file', requestData.file[0].file);
    setLoading(false);
    axios
      .post('/datasets/upload/', formData)
      .then((res) => {
        handleClose();
        setLoading(true);
        history.push(`/${res.data.id}/detail`);
      })
      .catch((error) => {
        // Error 😨
        setLoading(true);
        if (error.response) {
          if (error.response.status === 500) {
            alert.show('데이터셋을 확인해주세요.', 'error');
          } else if (error.response.status === 415) {
            alert.show(`${error.response.data.messages}`, 'error');
          }
        }
      });
  };

  return (
    <div>
      <Dialog open={uploadModal} onClose={handleClose} fullWidth>
        <MainTitle>Data Registration</MainTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeTitle}
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeDescription}
          />
          <UploadFormMargin>
            <DropzoneAreaBase
              acceptedFiles={[
                '.csv',
                'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              ]}
              fileObjects={requestData.file}
              onAdd={handleAdd}
              onDelete={handleDelete}
              maxFileSize={Infinity}
              showPreviews
              showPreviewsInDropzone={false}
              useChipsForPreview
              showFileNamesInPreview
              previewText="Selected files"
              clearOnUnmount
            />
          </UploadFormMargin>
        </DialogContent>
        <DialogActions>
          <>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            {loading && (
              <Button onClick={submitData} disabled={buttonActive}>
                Create
              </Button>
            )}
            {!loading && <Loading />}
          </>
        </DialogActions>
      </Dialog>
    </div>
  );
}
