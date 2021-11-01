import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import styled from 'styled-components';

const MainTitle = styled(DialogTitle)`
  display: flex;
  justify-content: center;
`;

const UploadFormMargin = styled(DialogContent)`
  margin-top: 3vh;
`;

export default function FileAddForm(props) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [buttonActive, setButtonActive] = useState(true);

  const handleAdd = (newFiles) => {
    setFiles(newFiles);
    setButtonActive(false);
  };

  const handleDelete = () => {
    setFiles([]);
    setButtonActive(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setUploadModal(false);
  };

  useEffect(() => {
    if (props.uploadModal === true) {
      handleClickOpen();
    } else {
      handleClose();
    }
    return () => {
      handleClose();
    };
  }, [props]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <MainTitle>
          <DialogTitle>Data Registration</DialogTitle>
        </MainTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <UploadFormMargin>
            <DropzoneAreaBase
              acceptedFiles={['.csv', '.xlsx', '.xls']}
              fileObjects={files}
              onAdd={handleAdd}
              onDelete={handleDelete}
              maxFileSize={Infinity}
              showPreviews
              showPreviewsInDropzone={false}
              useChipsForPreview
              showFileNamesInPreview
              previewText="Selected files"
            />
          </UploadFormMargin>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} disabled={buttonActive}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
