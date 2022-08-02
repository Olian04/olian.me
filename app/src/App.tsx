import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Grid, CircularProgress } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { DocumentNavigatorView } from './views/DocumentNavigatorView';
import { DocumentReaderView } from './views/DocumentReaderView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      paddingTop: '20px',
      paddingBottom: '20px',
      '@media only screen and (max-width: 600px)': {
        padding: '0px',
      }
    },
    documentContainer: {
      display: 'flex',
      gap: '20px',
    }
  })
);

export const App = () => {
  const classes =  useStyles();
  return (
    <Router>
      <Container
        maxWidth="md"
        className={classes.app}
        >
        <Grid
          container
          justify="center"
          alignContent="stretch"
          className={classes.documentContainer}
        >
          <DocumentNavigatorView />
          <DocumentReaderView />
        </Grid>
      </Container>
    </Router>
  );
};
