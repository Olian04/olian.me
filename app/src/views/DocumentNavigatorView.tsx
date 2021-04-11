import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Paper,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { useGithubAuth } from '../hooks/use-github-auth';
import {
  currentFolderData,
  currentFolderIDState,
  foldersInCurrentFolder,
} from '../state/folder';
import { currentFileIDState, filesInCurrentFolder } from '../state/file';
import { DocumentNavigatorGroup } from '../components/DocumentNavigator/DocumentNavigatorGroup';
import { DocumentNavigatorButton } from '../components/DocumentNavigator/DocumentNavigatorButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.info.light,
    },
    loadingPlaceholder: {
      backgroundColor: theme.palette.background.default,
      padding: '10px',
    },
    userName: {
      color: theme.palette.text.secondary,
    },
    heading: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.text.primary,
      borderColor: `${theme.palette.primary.main} !important`,
      padding: '10px',

      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: 'none',
      },
    },
  })
);

const Heading = (props: { className?: string }) => {
  const classes = useStyles();
  const [user, startLoginSequence, logout] = useGithubAuth();
  const { className, ...innerProps } = props;

  return (
    <Paper className={clsx(classes.heading, className ?? '')} {...innerProps}>
      <Grid container justify="space-between">
        <Grid item xs container direction="column" justify="flex-start">
          <Typography variant="h6">Olian.me</Typography>
          {user ? (
            <Typography variant="subtitle1" className={classes.userName}>
              Signed in as: {user.name}
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs container alignItems="center" justify="flex-end">
          {user ? (
            <>
              <Button variant="text" onClick={logout}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="text" onClick={startLoginSequence}>
              Sign in
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export const Content = () => {
  const setCurrentFolderID = useSetRecoilState(currentFolderIDState);
  const setCurrentFileID = useSetRecoilState(currentFileIDState);
  const currentFolder = useRecoilValue(currentFolderData);
  const folders = useRecoilValue(foldersInCurrentFolder);
  const files = useRecoilValue(filesInCurrentFolder);

  return (
    <DocumentNavigatorGroup>
      <Heading />
      {currentFolder.id === currentFolder.parent ? null : (
        <DocumentNavigatorButton
          variant="folder"
          name=".."
          onClick={() => setCurrentFolderID(currentFolder.parent)}
        />
      )}
      {folders.map((folder, i) => (
        <DocumentNavigatorButton
          key={`folder-${i}`}
          variant="folder"
          name={folder.name}
          onClick={() => setCurrentFolderID(folder.id)}
        />
      ))}
      {files.map((file, i) => (
        <DocumentNavigatorButton
          key={`file-${i}`}
          variant="file"
          name={file.name}
          timestamp={file.lastEdited}
          onClick={() => setCurrentFileID(file.id)}
        />
      ))}
    </DocumentNavigatorGroup>
  );
};

const Loading = () => {
  const classes = useStyles();

  return (
    <DocumentNavigatorGroup>
      <Heading />
      <Paper className={classes.loadingPlaceholder}>
        <Grid container justify="space-around" alignContent="center">
          <CircularProgress color="primary" />
        </Grid>
      </Paper>
    </DocumentNavigatorGroup>
  );
};

export const DocumentNavigatorView = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Content />
    </React.Suspense>
  );
};
