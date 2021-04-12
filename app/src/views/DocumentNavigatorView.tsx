import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Paper, Grid, CircularProgress } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { useGithubAuth } from '../hooks/use-github-auth';
import {
  currentFolderData,
  currentFolderIDState,
  foldersInCurrentFolder,
} from '../state/folder';
import { currentFileIDState, filesInCurrentFolder } from '../state/file';
import { DocumentNavigatorGroup } from '../components/DocumentNavigator/DocumentNavigatorGroup';
import { DocumentNavigatorButton } from '../components/DocumentNavigator/DocumentNavigatorButton';
import { DocumentNavigatorHeading } from '../components/DocumentNavigatorHeading';

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

export const Content = () => {
  const setCurrentFolderID = useSetRecoilState(currentFolderIDState);
  const setCurrentFileID = useSetRecoilState(currentFileIDState);
  const currentFolder = useRecoilValue(currentFolderData);
  const folders = useRecoilValue(foldersInCurrentFolder);
  const files = useRecoilValue(filesInCurrentFolder);
  const [user, startLoginSequence, logout] = useGithubAuth();

  return (
    <DocumentNavigatorGroup>
      <DocumentNavigatorHeading
        user={user}
        onSignIn={startLoginSequence}
        onSignOut={logout}
      />
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
  const [user, startLoginSequence, logout] = useGithubAuth();

  return (
    <DocumentNavigatorGroup>
      <DocumentNavigatorHeading
        user={user}
        onSignIn={startLoginSequence}
        onSignOut={logout}
      />
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
