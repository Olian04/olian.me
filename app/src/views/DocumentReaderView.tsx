import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ButtonGroup, Paper, Grid } from '@material-ui/core';
import { Edit as EditIcon, Subject as SubjectIcon } from '@material-ui/icons';
import { RenderMarkdown } from '../components/RenderMarkdown';
import { Switch } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.info.light,
    },
    heading: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      borderColor: `${theme.palette.info.light} !important`,
      padding: '10px',

      '&:hover': {
        backgroundColor: theme.palette.background.default,
        boxShadow: 'none',
      },
    },
  })
);

const demoMarkdown = `
# Hello World

This is a markdown document

With __bold__ and *cursive* text.
`.trim();

export const DocumentReaderView = () => {
  const classes = useStyles();
  return (
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      fullWidth={true}
      style={{
        paddingTop: '20px',
      }}
    >
      <Paper className={classes.heading}>
        <Grid container justify="space-between">
          <Grid item xs container alignItems="center">
            <SubjectIcon className={classes.icon} />
            <span style={{ paddingLeft: '5px' }}>README.md</span>
          </Grid>
          <EditIcon className={classes.icon} />
        </Grid>
      </Paper>
      <Paper
        style={{
          padding: '0px',
          paddingLeft: '30px',
          paddingRight: '30px',
        }}
      >
        <RenderMarkdown markdown={demoMarkdown} />
      </Paper>
    </ButtonGroup>
  );
};
