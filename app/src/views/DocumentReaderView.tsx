import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ButtonGroup, Paper, Grid } from '@material-ui/core';
import { Edit as EditIcon, Subject as SubjectIcon } from '@material-ui/icons';
import { RenderMarkdown } from '../components/RenderMarkdown';
import { Switch } from 'react-router-dom';
import clsx from 'clsx';

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

const demoMarkdown = `
# Hello World

This is a markdown document

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b | c | d |
|:-:|:-:|:-:|:--:|
| 1 | 2| 3 | 4 |
| 1 | 2| 3 | 4 |
| 1 | 2| 3 | 4 |
| 1 | 2| 3 | 4 |

\`\`\`js
const a = 10;
const b =  32;
console.log(a + b);
\`\`\`
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
        paddingBottom: '20px',
      }}
    >
      <Paper className={classes.heading}>
        <Grid container justify="space-between">
          <Grid item xs container alignItems="center">
            <SubjectIcon className={classes.subjectIcon} />
            <span style={{ paddingLeft: '5px' }}>README.md</span>
          </Grid>
          <EditIcon className={classes.editIcon} />
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
        <RenderMarkdown markdown={demoMarkdown} />
      </Paper>
    </ButtonGroup>
  );
};
