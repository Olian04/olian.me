import React, { useState } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { Paper, Grid, CircularProgress, IconButton } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  NoteAddOutlined as NewFileIcon,
  CreateNewFolder as NewFolderIcon,
} from '@material-ui/icons';

import { useGithubAuth } from '../hooks/use-github-auth';
import {
  currentFolderData,
  currentFolderIDState,
  folderData,
  foldersInCurrentFolder,
} from '../state/folder';
import { currentFileIDState, filesInCurrentFolder } from '../state/file';
import { DocumentNavigatorGroup } from '../components/DocumentNavigator/DocumentNavigatorGroup';
import { DocumentNavigatorButton } from '../components/DocumentNavigator/DocumentNavigatorButton';
import { DocumentNavigatorHeading } from '../components/DocumentNavigatorHeading';
import { PopupCreateNew } from '../components/PopupCreateNew';
import { userIsAuthenticatedState } from '../state/user';
import {
  getFile,
  getFolder,
  setFile,
  setFolder,
} from '../services/firebase/firestore';
import {
  editorContentState,
  editorIsActiveState,
  editorNameState,
} from '../state/editor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fileIcon: {
      color: theme.palette.info.light,
    },
    folderIcon: {
      color: theme.palette.primary.main,
    },
    loadingPlaceholder: {
      backgroundColor: theme.palette.background.default,
      padding: '10px',
    },
  })
);

export const Content = () => {
  const classes = useStyles();
  const setCurrentFolderID = useSetRecoilState(currentFolderIDState);
  const setCurrentFileID = useSetRecoilState(currentFileIDState);
  const currentFolder = useRecoilValue(currentFolderData);
  const folders = useRecoilValue(foldersInCurrentFolder);
  const files = useRecoilValue(filesInCurrentFolder);
  const isAuthenticated = useRecoilValue(userIsAuthenticatedState);
  const [user, startLoginSequence, logout] = useGithubAuth();
  const [popupState, setPopupState] = useState<{
    open: boolean;
    variant: 'folder' | 'file';
  }>({
    open: false,
    variant: 'file',
  });

  const closePopup = () =>
    setPopupState({
      open: false,
      variant: 'file',
    });

  const createNew = useRecoilCallback(
    ({ set }) => async (type: 'folder' | 'file', name: string) => {
      closePopup();
      if (type === 'file') {
        const id = await setFile({
          name,
          content: '',
        });
        const newFile = await getFile(id);

        set(currentFileIDState, newFile.id);
        set(editorIsActiveState, true);
        set(editorContentState, newFile.content);
        set(editorNameState, newFile.name);

        const newFolderState = {
          ...currentFolder,
          files: [...currentFolder.files, id],
        };
        set(folderData(currentFolder.id), newFolderState);
        set(currentFolderIDState, currentFolder.id);
        setFolder(newFolderState);
      }
      if (type === 'folder') {
        const id = await setFolder({
          name,
          parent: currentFolder.id,
          files: [],
          folders: [],
        });
        const newFolder = await getFolder(id);

        set(folderData(id), newFolder);

        const newFolderState = {
          ...currentFolder,
          folders: [...currentFolder.folders, id],
        };
        set(folderData(currentFolder.id), newFolderState);
        set(currentFolderIDState, currentFolder.id);
        setFolder(newFolderState);
      }
    }
  );

  return (
    <>
      <PopupCreateNew
        open={popupState.open}
        initialType={popupState.variant}
        onSuccess={createNew}
        onDismiss={closePopup}
      />
      <DocumentNavigatorGroup>
        <DocumentNavigatorHeading
          user={user}
          onSignIn={startLoginSequence}
          onSignOut={logout}
        />
        {isAuthenticated ? (
          <DocumentNavigatorButton
            variant="plain"
            name="Create new folder..."
            startIcon={<NewFolderIcon className={classes.folderIcon} />}
            onClick={() =>
              setPopupState({
                open: true,
                variant: 'folder',
              })
            }
          />
        ) : null}
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
        {isAuthenticated ? (
          <DocumentNavigatorButton
            variant="plain"
            name="Create new file..."
            startIcon={<NewFileIcon className={classes.fileIcon} />}
            onClick={() =>
              setPopupState({
                open: true,
                variant: 'file',
              })
            }
          />
        ) : null}
      </DocumentNavigatorGroup>
    </>
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
