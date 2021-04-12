import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  ButtonGroup,
  Paper,
  Grid,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { Edit as EditIcon, Subject as SubjectIcon } from '@material-ui/icons';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import clsx from 'clsx';

import { RenderMarkdown } from '../components/RenderMarkdown';
import { currentFileData, fileData } from '../state/file';
import { getFile, setFile } from '../services/firebase/firestore';

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
  onClickEdit?: () => void;
  className?: string;
}

export const DocumentReaderHeading = (props: Props) => {
  const {
    fileName,
    className,
    isAuthenticated,
    onClickEdit,
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
          <IconButton className={classes.editIcon} onClick={onClickEdit}>
            <EditIcon />
          </IconButton>
        ) : null}
      </Grid>
    </Paper>
  );
};
