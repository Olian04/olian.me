import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  DialogContentText,
} from '@material-ui/core';

interface Props {
  open: boolean;
  subject: string;
  description: string;
  onSuccess: () => void;
  onDismiss: () => void;
}

export const PopupVerify = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      fullWidth
      onBackdropClick={props.onDismiss}
      onSubmit={props.onSuccess}
    >
      <DialogTitle id="alert-dialog-title">{props.subject}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDismiss} color="primary" autoFocus>
          No
        </Button>
        <Button onClick={props.onSuccess} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
