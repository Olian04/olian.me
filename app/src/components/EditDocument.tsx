import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    document: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      border: 'none',
      marginTop: '15px',
      marginBottom: '15px',
      width: '100%',
    },
  })
);

interface Props {
  initialContent: string;
  onChange: (newContent: string) => void;
}

export const EditDocument = (props: Props) => {
  const classes = useStyles();

  return (
    <TextareaAutosize
      className={classes.document}
      autoFocus={true}
      contentEditable={true}
      defaultValue={props.initialContent}
      rowsMin={3}
      onChange={(ev) => props.onChange(ev.currentTarget.value)}
    />
  );
};
