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
          <React.Suspense fallback={<CircularProgress color="primary" />}>
            <DocumentNavigatorView />
          </React.Suspense>
          <React.Suspense fallback={<CircularProgress color="primary" />}>
            <DocumentReaderView />
          </React.Suspense>
        </Grid>
      </Container>
    </Router>
  );
};
