import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { IconConstructor } from '../../interfaces/Icon';

const iconSize = 17;

interface LinkProps {
  active: boolean;
}
const Link = styled.a<LinkProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  padding: 20px;
  text-decoration: none;
  border-bottom: transparent solid 1px;

  color: ${(props) =>
    props.active ? props.theme.text.high : props.theme.text.medium};
  border-color: ${(props) =>
    props.active ? props.theme.text.high : 'transparent'};

  &:hover {
    border-color: ${(props) =>
      props.active ? props.theme.text.high : props.theme.text.medium};
  }
`;

interface Props {
  to: string;
  title: string;
  icon?: IconConstructor;
}

export const NavLink = (props: Props) => {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const [active, setActive] = useState(props.to === location.pathname);

  useEffect(() => {
    setActive(props.to === location.pathname);
  }, [location.pathname]);

  return (
    <Link
      active={active}
      href={props.to} // For screen reader support
      onClick={(ev) => {
        ev.preventDefault();
        history.push(props.to);
      }}
    >
      {props.icon
        ? props.icon({
            height: iconSize,
            width: iconSize,
            overrideColor: active ? theme.text.high : theme.text.medium,
          })
        : null}
      {props.title}
    </Link>
  );
};
