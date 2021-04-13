import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Grid, IconButton } from '@material-ui/core';
import {
  Edit as EditIcon,
  Subject as SubjectIcon,
  Save as SaveIcon,
  Clear as DiscardIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

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
    ...innerProps
  } = props;
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.heading, className ?? '')} {...innerProps}>
      <Grid container justify="space-between">
        <Grid item xs container alignItems="center">
          <SubjectIcon className={classes.subjectIcon} />
          <span style={{ paddingLeft: '5px' }}>{fileName}</span>
        </Grid>
        {isAuthenticated ? (
          isEditActive ? (
            <>
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
  );
};
