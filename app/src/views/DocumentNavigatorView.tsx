import React from 'react';
import { subDays, subHours } from 'date-fns';
import { Paper, Grid } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { DocumentNavigatorGroup } from '../components/DocumentNavigator/DocumentNavigatorGroup';
import { DocumentNavigatorButton } from '../components/DocumentNavigator/DocumentNavigatorButton';

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

  return (
    <DocumentNavigatorGroup>
      <Paper className={classes.heading}>
        <Grid container justify="space-between">
          <span>Oliver Anteros Linnarsson</span>
          <span>Olian04</span>
        </Grid>
      </Paper>
      <DocumentNavigatorButton variant="folder" name=".." />
      <DocumentNavigatorButton
        variant="folder"
        name="projects"
        timestamp={new Date()}
      />
      <DocumentNavigatorButton
        variant="folder"
        name="blog"
        timestamp={subHours(new Date(), 2)}
      />
      <DocumentNavigatorButton
        variant="file"
        name="ABOUT.md"
        timestamp={subDays(new Date(), 3)}
      />
      <DocumentNavigatorButton
        variant="file"
        name="README.md"
        timestamp={subHours(new Date(), 10)}
      />
    </DocumentNavigatorGroup>
  );
};
