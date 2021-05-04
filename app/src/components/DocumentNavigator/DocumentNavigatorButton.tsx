import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ButtonProps } from '@material-ui/core';
import {
  Folder as FolderIcon,
  InsertDriveFileOutlined as FileIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import { DocumentNavigatorButtonBase } from './DocumentNavigatorButtonBase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fileIcon: {
      color: theme.palette.info.light,
    },
    fileIconActive: {
      color: theme.palette.secondary.main,
    },
    folderIcon: {
      color: theme.palette.primary.main,
    },
    highlight: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.text.primary,
      borderColor: `${theme.palette.primary.main} !important`,

      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: 'none',
      },
    },
    base: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      borderColor: `${theme.palette.info.light} !important`,

      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
      },
    },
  })
);

interface Props extends Omit<ButtonProps, 'variant' | 'name'> {
  variant: 'file' | 'folder' | 'highlight' | 'plain';
  name: string;
  active?: boolean;
  timestamp?: Date;
  endText?: string;
}

export const DocumentNavigatorButton = (props: Props) => {
  const { variant, className, active, ...innerProps } = props;
  const classes = useStyles();

  switch (variant) {
    case 'file':
      return (
        <DocumentNavigatorButtonBase
          startIcon={
            <FileIcon
              className={
                props.active ? classes.fileIconActive : classes.fileIcon
              }
            />
          }
          className={clsx(classes.base, className ?? '')}
          {...innerProps}
        />
      );
    case 'folder':
      return (
        <DocumentNavigatorButtonBase
          startIcon={<FolderIcon className={classes.folderIcon} />}
          className={clsx(classes.base, className ?? '')}
          {...innerProps}
        />
      );
    case 'highlight':
      return (
        <DocumentNavigatorButtonBase
          className={clsx(classes.highlight, className ?? '')}
          disableRipple={true}
          {...innerProps}
        />
      );
    default:
      return (
        <DocumentNavigatorButtonBase
          className={clsx(classes.base, className ?? '')}
          {...innerProps}
        />
      );
  }
};
