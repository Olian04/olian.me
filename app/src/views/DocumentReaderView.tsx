import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ButtonGroup, Paper, Grid, CircularProgress } from '@material-ui/core';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { DocumentReaderHeading } from '../components/DucumentReaderHeading';
import { RenderMarkdown } from '../components/RenderMarkdown';
import { currentFileData, fileData } from '../state/file';
import { getFile, setFile } from '../services/firebase/firestore';
import { userIsAuthenticatedState } from '../state/user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const Content = () => {
  const classes = useStyles();
  const currentFile = useRecoilValue(currentFileData);
  const isAuthenticated = useRecoilValue(userIsAuthenticatedState);

  const touchFile = useRecoilCallback(({ set, snapshot }) => async () => {
    const currentValue = await snapshot.getPromise(currentFileData);
    const id = await setFile(currentValue); // No changes, but will cause an update to timestamp
    const newValue = await getFile(id);
    set(fileData(id), newValue);
  });

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
      <DocumentReaderHeading
        fileName={currentFile.name}
        isAuthenticated={isAuthenticated}
        onClickEdit={touchFile}
      />
      <Paper className={classes.document}>
        <RenderMarkdown markdown={currentFile.content} />
      </Paper>
    </ButtonGroup>
  );
};

const Loading = () => {
  const classes = useStyles();
  const isAuthenticated = useRecoilValue(userIsAuthenticatedState);

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
      <DocumentReaderHeading fileName="" isAuthenticated={isAuthenticated} />
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
