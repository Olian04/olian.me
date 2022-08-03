import React, { useState } from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Paper, Grid, CircularProgress, IconButton } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  NoteAddOutlined as NewFileIcon,
  CreateNewFolder as NewFolderIcon,
  DeleteForever as DeleteFolderIcon,
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
import { PopupVerify } from '../components/PopupVerify';
import { userIsAuthenticatedState } from '../state/user';
import {
  getFile,
  getFolder,
  setFile,
  setFolder,
  deleteFolder,
  getRootFolderID
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
  const [currentFileID, setCurrentFileID] = useRecoilState(currentFileIDState);
  const currentFolder = useRecoilValue(currentFolderData);
  const folders = useRecoilValue(foldersInCurrentFolder);
  const files = useRecoilValue(filesInCurrentFolder);
  const isAuthenticated = useRecoilValue(userIsAuthenticatedState);
  const [user, startLoginSequence, logout] = useGithubAuth();
  const [createPopupState, setCreatePopupState] = useState<{
    open: boolean;
    variant: 'folder' | 'file';
  }>({
    open: false,
    variant: 'file',
  });
  const [verifyPopupOpen, setVerifyPopupOpen] = useState<boolean>(false);

  const resetNavigation = useRecoilCallback(({ reset }) => () => {
    reset(currentFileIDState);
    reset(currentFolderIDState);
  });


  const closeVerifyPopup = () =>
    setVerifyPopupOpen(false);

  const closeCreatePopup = () =>
    setCreatePopupState({
      open: false,
      variant: 'file',
    });

  const createNew = useRecoilCallback(
    ({ set }) => async (type: 'folder' | 'file', name: string) => {
      closeCreatePopup();
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
    });

    const removeFolder = useRecoilCallback(({ set, reset }) => async () => {
      closeVerifyPopup();

      if (files.find(f => f.id === currentFileID)) {
        reset(currentFileIDState);
        reset(editorIsActiveState);
        reset(editorNameState);
        reset(editorContentState);
      }

      await deleteFolder(currentFolder.id);
      const newCurrentFolder = await getFolder(currentFolder.parent);
      set(folderData(newCurrentFolder.id), newCurrentFolder);
      set(currentFolderIDState, newCurrentFolder.id);
    });

  return (
    <>
      <PopupCreateNew
        open={createPopupState.open}
        initialType={createPopupState.variant}
        onSuccess={createNew}
        onDismiss={closeCreatePopup}
      />
      <PopupVerify
        open={verifyPopupOpen}
        subject='Delete folder?'
        description='Are you sure you want to permanently delete this folder and all of its documents and subfolders?'
        onDismiss={closeVerifyPopup}
        onSuccess={removeFolder}
      />
      <DocumentNavigatorGroup>
        <DocumentNavigatorHeading
          user={user}
          onSignIn={startLoginSequence}
          onSignOut={logout}
          onClickLogo={resetNavigation}
        />
        {isAuthenticated ? (
          <>
            <DocumentNavigatorButton
              variant="plain"
              name="Create new folder..."
              startIcon={<NewFolderIcon className={classes.folderIcon} />}
              onClick={() =>
                setCreatePopupState({
                  open: true,
                  variant: 'folder',
                })
              }
            />
            {currentFolder.name === 'root' /* Naive solution, should check against rootFolderID */ ? null :
              <DocumentNavigatorButton
                variant="plain"
                name="Delete this folder..."
                startIcon={<DeleteFolderIcon className={classes.folderIcon} />}
                onClick={() =>
                  setVerifyPopupOpen(true)
                }
              />
            }
          </>
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
            active={file.id === currentFileID}
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
              setCreatePopupState({
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

const LoadingFallback = () => {
  const classes = useStyles();
  const [user, startLoginSequence, logout] = useGithubAuth();
  const resetNavigation = useRecoilCallback(({ reset }) => () => {
    reset(currentFileIDState);
    reset(currentFolderIDState);
  });

  return (
    <DocumentNavigatorGroup>
      <DocumentNavigatorHeading
        user={user}
        onSignIn={startLoginSequence}
        onSignOut={logout}
        onClickLogo={resetNavigation}
      />
      <Paper className={classes.loadingPlaceholder}>
        <Grid container justify="space-around" alignContent="center">
          <CircularProgress color="primary" />
        </Grid>
      </Paper>
    </DocumentNavigatorGroup>
  );
};

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const classes = useStyles();
  const [user, startLoginSequence, logout] = useGithubAuth();
  const resetNavigation = useRecoilCallback(({ reset }) => () => {
    resetErrorBoundary();
    reset(currentFileIDState);
    reset(currentFolderIDState);
  });

  return (
    <DocumentNavigatorGroup>
      <DocumentNavigatorHeading
        user={user}
        onSignIn={startLoginSequence}
        onSignOut={logout}
        onClickLogo={resetNavigation}
      />
      <Paper className={classes.loadingPlaceholder}>
        <h1>{error.name}</h1>
        <p>{error.message}</p>
      </Paper>
    </DocumentNavigatorGroup>
  );
};

export const DocumentNavigatorView = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <React.Suspense fallback={<LoadingFallback />}>
        <Content />
      </React.Suspense>
    </ErrorBoundary>
  );
};
