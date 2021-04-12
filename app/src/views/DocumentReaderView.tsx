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
import { useRecoilValue } from 'recoil';
import clsx from 'clsx';

import { RenderMarkdown } from '../components/RenderMarkdown';
import { currentFileData } from '../state/file';

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
    document: {
      backgroundColor: theme.palette.background.default,
      padding: '0px',
      paddingLeft: '30px',
      paddingRight: '30px',
    },
    loadingPlaceholder: {
      backgroundColor: theme.palette.background.default,
      padding: '10px',
    },
  })
);

const Heading = (props: { fileName: string; className?: string }) => {
  const classes = useStyles();
  const { fileName, className, ...innerProps } = props;

  return (
    <Paper className={clsx(classes.heading, className ?? '')} {...innerProps}>
      <Grid container justify="space-between">
        <Grid item xs container alignItems="center">
          <SubjectIcon className={classes.subjectIcon} />
          <span style={{ paddingLeft: '5px' }}>{fileName}</span>
        </Grid>
        <IconButton className={classes.editIcon}>
          <EditIcon />
        </IconButton>
      </Grid>
    </Paper>
  );
};

const Content = () => {
  const classes = useStyles();
  const currentFile = useRecoilValue(currentFileData);

  return (
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      fullWidth={true}
      style={{
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <Heading fileName={currentFile.name} />
      <Paper className={classes.document}>
        <RenderMarkdown markdown={currentFile.content} />
      </Paper>
    </ButtonGroup>
  );
};

const Loading = () => {
  const classes = useStyles();

  return (
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      fullWidth={true}
      style={{
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <Heading fileName="" />
      <Paper className={classes.loadingPlaceholder}>
        <Grid container justify="space-around" alignContent="center">
          <CircularProgress color="primary" />
        </Grid>
      </Paper>
    </ButtonGroup>
  );
};

export const DocumentReaderView = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Content />
    </React.Suspense>
  );
};
