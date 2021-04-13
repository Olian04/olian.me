import React, { useEffect, useState } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ButtonGroup, Paper, Grid, CircularProgress } from '@material-ui/core';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

import { DocumentReaderHeading } from '../components/DucumentReaderHeading';
import { RenderMarkdown } from '../components/RenderMarkdown';
import { EditDocument } from '../components/EditDocument';
import { currentFileData, fileData } from '../state/file';
import { getFile, setFile } from '../services/firebase/firestore';
import { userIsAuthenticatedState } from '../state/user';
import { editorContentState, editorIsActiveState } from '../state/editor';

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
  const [isEditActive, setIsEditActive] = useRecoilState(editorIsActiveState);
  const [editContent, setEditContent] = useRecoilState(editorContentState);

  const activateEdit = () => {
    setEditContent(currentFile.content);
    setIsEditActive(true);
  };
  const discardChanges = () => {
    setEditContent('');
    setIsEditActive(false);
  };

  const saveChanges = useRecoilCallback(({ set, snapshot }) => async () => {
    const currentValue = await snapshot.getPromise(currentFileData);
    const id = await setFile({
      ...currentValue,
      content: editContent,
    });
    const newValue = await getFile(id);
    set(fileData(id), newValue);
    set(editorIsActiveState, false);
    set(editorContentState, '');
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
        isEditActive={isEditActive}
        isLoading={false}
        onClickEdit={activateEdit}
        onClickSave={saveChanges}
        onClickDiscard={discardChanges}
      />
      <Paper className={classes.document}>
        {isAuthenticated && isEditActive ? (
          <EditDocument
            initialContent={currentFile.content}
            onChange={setEditContent}
          />
        ) : (
          <RenderMarkdown markdown={currentFile.content} />
        )}
      </Paper>
    </ButtonGroup>
  );
};

const Loading = () => {
  const classes = useStyles();
  const isAuthenticated = useRecoilValue(userIsAuthenticatedState);
  const isEditActive = useRecoilValue(editorIsActiveState);

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
        fileName=""
        isAuthenticated={isAuthenticated}
        isEditActive={isEditActive}
        isLoading={true}
      />
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
