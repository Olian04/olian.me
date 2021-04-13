import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    document: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      borderRadius: `${theme.shape.borderRadius}px`,
      '& input': {
        paddingLeft: '5px',
      },
    },
  })
);

interface Props {
  initialContent: string;
  onChange: (newContent: string) => void;
}

export const EditDocumentTitle = (props: Props) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.document}
      variant="standard"
      contentEditable={true}
      defaultValue={props.initialContent}
      onChange={(ev) => props.onChange(ev.currentTarget.value)}
    />
  );
};
