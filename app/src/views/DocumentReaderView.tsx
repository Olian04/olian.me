import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ButtonGroup, Paper, Grid, IconButton } from '@material-ui/core';
import { Edit as EditIcon, Subject as SubjectIcon } from '@material-ui/icons';
import { RenderMarkdown } from '../components/RenderMarkdown';
import { useRecoilValue } from 'recoil';

import { currentFileData } from '../state/file';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subjectIcon: {
      color: theme.palette.info.light,
    },
    editIcon: {
      color: theme.palette.info.light,
      cursor: 'pointer',

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    heading: {
      backgroundColor: '#0d1117',
      color: theme.palette.text.primary,
      borderColor: `${theme.palette.info.light} !important`,
      padding: '10px',

      '&:hover': {
        backgroundColor: '#0d1117',
        boxShadow: 'none',
      },
    },
    document: {
      backgroundColor: theme.palette.background.default,
    },
  })
);

export const DocumentReaderView = () => {
  const classes = useStyles();
  const currentFile = useRecoilValue(currentFileData);

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
      <Paper className={classes.heading}>
        <Grid container justify="space-between">
          <Grid item xs container alignItems="center">
            <SubjectIcon className={classes.subjectIcon} />
            <span style={{ paddingLeft: '5px' }}>README.md</span>
          </Grid>
          <IconButton className={classes.editIcon}>
            <EditIcon />
          </IconButton>
        </Grid>
      </Paper>
      <Paper
        className={classes.document}
        style={{
          padding: '0px',
          paddingLeft: '30px',
          paddingRight: '30px',
        }}
      >
        <RenderMarkdown markdown={currentFile.content} />
      </Paper>
    </ButtonGroup>
  );
};
