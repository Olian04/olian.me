import React from 'react';
import { Paper, Grid, Button, Typography, Avatar } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { User } from '../types/User';

const MONGOLIAN_VOWEL_SEPARATOR = '᠎';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      cursor: 'pointer',
      userSelect: 'none',
    },
    loginButton: {
      '&:hover': {
        cursor: 'default',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
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
  onClickLogo?: () => void;
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
          <Grid
            item
            xs
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Avatar
              alt="Website logo in the same style as the nodejs logo"
              src="android-chrome-512x512.png"
              className={classes.logo}
              onClick={props.onClickLogo}
            />
            <Typography
              variant="h6"
              className={classes.logo}
              onClick={props.onClickLogo}
            >
              Olian.me
            </Typography>
          </Grid>
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
            <Button
              variant="text"
              onClick={onSignIn}
              className={classes.loginButton}
              aria-hidden={true}
            >
              {/*
              Using a zero width character tricks the button styles
              into remaining at normal height.
              Even though the button doesn't have any visible text.
              Hiding the button doesn't serve any real purpose,
              other than making users less likely to press the "login" button.
              It doesn't matter if then do press it, they wont be able to log in either way.
              */}
              {MONGOLIAN_VOWEL_SEPARATOR}
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
