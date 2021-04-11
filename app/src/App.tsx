import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Grid, CircularProgress } from '@material-ui/core';

import { DocumentNavigatorView } from './views/DocumentNavigatorView';
import { DocumentReaderView } from './views/DocumentReaderView';

export const App = () => {
  return (
    <Router>
      <Container maxWidth="md">
        <Grid
          container
          justify="center"
          alignContent="stretch"
          style={{
            paddingTop: '20px',
          }}
        >
          <DocumentNavigatorView />
          <DocumentReaderView />
        </Grid>
      </Container>
    </Router>
  );
};
