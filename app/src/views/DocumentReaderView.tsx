import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ButtonGroup, Paper, Grid, CircularProgress } from '@material-ui/core';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

import { DocumentReaderHeading } from '../components/DucumentReaderHeading';
import { RenderMarkdown } from '../components/RenderMarkdown';
import { EditDocument } from '../components/EditDocument';
import { currentFileData, currentFileIDState, fileData } from '../state/file';
import { getFile, setFile, deleteFile } from '../services/firebase/firestore';
import { userIsAuthenticatedState } from '../state/user';
import {
  editorContentState,
  editorIsActiveState,
  editorNameState,
} from '../state/editor';
import {
  currentFolderData,
  currentFolderIDState,
  folderData,
} from '../state/folder';

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
  const [editName, setEditName] = useRecoilState(editorNameState);

  const activateEdit = () => {
    setEditContent(currentFile.content);
    setEditName(currentFile.name);
    setIsEditActive(true);
  };
  const discardChanges = () => {
    setEditContent('');
    setEditName('');
    setIsEditActive(false);
  };

  const saveChanges = useRecoilCallback(
    ({ set, reset, snapshot }) => async () => {
      const currentValue = await snapshot.getPromise(currentFileData);
      const id = await setFile({
        ...currentValue,
        content: editContent,
        name: editName,
      });
      const newValue = await getFile(id);
      set(fileData(id), newValue);
      reset(editorIsActiveState);
      reset(editorContentState);
      reset(editorNameState);
    }
  );

  const removeFile = useRecoilCallback(
    ({ set, reset, snapshot }) => async () => {
      deleteFile(currentFile.id);
      reset(currentFileIDState);
      reset(editorIsActiveState);
      reset(editorContentState);
      reset(editorNameState);

      const currentFolder = await snapshot.getPromise(currentFolderData);
      set(folderData(currentFolder.id), {
        ...currentFolder,
        files: currentFolder.files.filter((id) => id !== currentFile.id),
      });
      set(currentFolderIDState, currentFolder.id);
    }
  );

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
        onNameChange={setEditName}
        onClickDelete={removeFile}
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
