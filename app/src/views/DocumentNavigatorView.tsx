import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Paper, Grid } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import {
  currentFolderData,
  folderData,
  currentFolderID,
  foldersInCurrentFolder,
} from '../state/folder';
import { currentFileID, fileData, filesInCurrentFolder } from '../state/file';
import { DocumentNavigatorGroup } from '../components/DocumentNavigator/DocumentNavigatorGroup';
import { DocumentNavigatorButton } from '../components/DocumentNavigator/DocumentNavigatorButton';
import { Folder } from '../types/Folder';
import { File } from '../types/File';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.info.light,
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

export const DocumentNavigatorView = () => {
  const classes = useStyles();
  const setCurrentFolderID = useSetRecoilState(currentFolderID);
  const setCurrentFileID = useSetRecoilState(currentFileID);
  const currentFolder = useRecoilValue(currentFolderData);
  const folders = useRecoilValue(foldersInCurrentFolder);
  const files = useRecoilValue(filesInCurrentFolder);

  return (
    <DocumentNavigatorGroup>
      <Paper className={classes.heading}>
        <Grid container justify="space-between">
          <span>Oliver Anteros Linnarsson</span>
          <span>Olian04</span>
        </Grid>
      </Paper>
      <DocumentNavigatorButton
        variant="folder"
        name=".."
        onClick={() => setCurrentFolderID(currentFolder.parent)}
      />
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
