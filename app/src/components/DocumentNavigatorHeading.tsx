import React from 'react';
import { Paper, Grid, Button, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { User } from '../types/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userName: {
      color: theme.palette.text.secondary,
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

interface Props {
  user: User | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
  className?: string;
}

export const DocumentNavigatorHeading = (props: Props) => {
  const { className, onSignIn, onSignOut, user, ...innerProps } = props;
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.heading, className ?? '')} {...innerProps}>
      <Grid container justify="space-between">
        <Grid item xs container direction="column" justify="flex-start">
          <Typography variant="h6">Olian.me</Typography>
          {user ? (
            <Typography variant="subtitle1" className={classes.userName}>
              Signed in as: {user.name}
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs container alignItems="center" justify="flex-end">
          {user ? (
            <>
              <Button variant="text" onClick={onSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="text" onClick={onSignIn}>
              Sign in
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
