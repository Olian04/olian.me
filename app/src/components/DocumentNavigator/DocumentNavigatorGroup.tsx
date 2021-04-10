import { ButtonGroup, ButtonGroupProps } from '@material-ui/core';
import React from 'react';

interface Props extends ButtonGroupProps {}

export const DocumentNavigatorGroup = (props: Props) => {
  const { children, ...innerProps } = props;

  return (
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      fullWidth={true}
      {...innerProps}
    >
      {children}
    </ButtonGroup>
  );
};
