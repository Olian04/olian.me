import React, { useEffect, useState } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  DialogContentText,
} from '@material-ui/core';

type Variant = 'file' | 'folder';

interface Props {
  open: boolean;
  initialType: Variant;
  onSuccess: (type: Variant, name: string) => void;
  onDismiss: () => void;
}

export const PopupCreateNew = (props: Props) => {
  const [type, setType] = useState(props.initialType);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (props.open === false) return;
    setType(props.initialType);
    setName('');
    setNameError('');
  }, [props.open]);

  const submit = () => {
    if (!name) {
      setNameError('Required');
      return;
    }
    props.onSuccess(type as any, name);
  };

  return (
    <Dialog
      open={props.open}
      fullWidth
      onBackdropClick={props.onDismiss}
      onSubmit={submit}
    >
      <DialogTitle id="alert-dialog-title">Create new {type}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select what type of asset you want to create, and provide a name for
          it.
        </DialogContentText>
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          value={type}
          fullWidth
          onChange={(ev) => setType(ev.target.value as any)}
        >
          <MenuItem value="folder">Folder</MenuItem>
          <MenuItem value="file">File</MenuItem>
        </Select>
        <TextField
          label="Name"
          fullWidth
          error={!!nameError}
          helperText={nameError ?? undefined}
          onChange={(ev) => setName(ev.currentTarget.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDismiss} color="primary">
          Cancel
        </Button>
        <Button onClick={submit} color="primary" autoFocus>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
