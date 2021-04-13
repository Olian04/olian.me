import React, { useState } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Grid, IconButton, TextField } from '@material-ui/core';
import {
  Edit as EditIcon,
  Subject as SubjectIcon,
  Save as SaveIcon,
  Clear as DiscardIcon,
  DeleteOutline as DeleteIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import { PopupVerify } from './PopupVerify';
import { EditDocumentTitle } from './EditDocumentTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subjectIcon: {
      color: theme.palette.info.light,
    },
    editIcon: {
      color: theme.palette.info.light,
      cursor: 'pointer',

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    heading: {
      backgroundColor: '#0d1117',
      color: theme.palette.text.primary,
      borderColor: `${theme.palette.info.light} !important`,
      padding: '10px',

      '&:hover': {
        backgroundColor: '#0d1117',
        boxShadow: 'none',
      },
    },
  })
);

interface Props {
  fileName: string;
  isAuthenticated: boolean;
  isEditActive: boolean;
  isLoading: boolean;
  onClickEdit?: () => void;
  onClickSave?: () => void;
  onClickDiscard?: () => void;
  onClickDelete?: () => void;
  onNameChange?: (newTitle: string) => void;
  className?: string;
}

export const DocumentReaderHeading = (props: Props) => {
  const {
    fileName,
    className,
    isAuthenticated,
    isEditActive,
    isLoading,
    onClickEdit,
    onClickSave,
    onClickDiscard,
    onClickDelete,
    onNameChange,
    ...innerProps
  } = props;
  const classes = useStyles();
  const [verifyDeleteOpen, setVerifyDeleteOpen] = useState(false);

  return (
    <>
      <PopupVerify
        open={verifyDeleteOpen}
        onSuccess={() => {
          setVerifyDeleteOpen(false);
          if (onClickDelete) {
            onClickDelete();
          }
        }}
        onDismiss={() => {
          setVerifyDeleteOpen(false);
        }}
        subject={`Delete ${fileName}?`}
        description={`Are you sure you want to delete ${fileName}?`}
      />
      <Paper className={clsx(classes.heading, className ?? '')} {...innerProps}>
        <Grid container justify="space-between">
          <Grid item xs container alignItems="center">
            <SubjectIcon className={classes.subjectIcon} />
            {isAuthenticated && isEditActive ? (
              <EditDocumentTitle
                initialContent={fileName}
                onChange={onNameChange ?? (() => {})}
              />
            ) : (
              <span style={{ paddingLeft: '5px' }}>{fileName}</span>
            )}
          </Grid>
          {isAuthenticated ? (
            isEditActive ? (
              <>
                <IconButton
                  className={classes.editIcon}
                  onClick={() => setVerifyDeleteOpen(true)}
                  disabled={isLoading}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  className={classes.editIcon}
                  onClick={onClickSave}
                  disabled={isLoading}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  className={classes.editIcon}
                  onClick={onClickDiscard}
                  disabled={isLoading}
                >
                  <DiscardIcon />
                </IconButton>
              </>
            ) : (
              <IconButton
                className={classes.editIcon}
                onClick={onClickEdit}
                disabled={isLoading}
              >
                <EditIcon />
              </IconButton>
            )
          ) : null}
        </Grid>
      </Paper>
    </>
  );
};
