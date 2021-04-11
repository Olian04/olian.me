import React from 'react';
import { Button, ButtonProps, Grid } from '@material-ui/core';
import { formatDistance } from 'date-fns';

interface Props extends ButtonProps {
  name: string;
  timestamp?: Date;
  endText?: string;
}

export const DocumentNavigatorButtonBase = (props: Props) => {
  const { name, timestamp, children, endText, ...innerProps } = props;

  return (
    <Button
      disableElevation={true}
      fullWidth={true}
      variant="contained"
      {...innerProps}
    >
      <Grid container justify="space-between">
        <span>{name}</span>
        <span>
          {timestamp
            ? formatDistance(timestamp, new Date(), { addSuffix: true })
            : endText ?? ''}
        </span>
      </Grid>
    </Button>
  );
};
