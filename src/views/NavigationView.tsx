import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { NavLink } from '../components/navigation/NavLink';
import { FlameIcon } from '../icons/timeline/flame';
import { BoxIcon } from '../icons/timeline/box';
import { KanbanIcon } from '../icons/timeline/kanban';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  z-index: 100;
`;

const publicPaths = ['/', '/projects', '/packages'];

export const NavigationView = () => {
  const location = useLocation();
  const [isDynamic, setIsDynamic] = useState(false);
  const [dynamicPathName, setDynamicPathName] = useState('');

  useEffect(() => {
    setIsDynamic(publicPaths.indexOf(location.pathname) === -1);
  }, [location.pathname]);

  useEffect(() => {
    if (!isDynamic) return;
    setDynamicPathName(
      location.pathname[1].toUpperCase() +
        location.pathname.substring(2).toLowerCase()
    );
  }, [isDynamic]);

  return (
    <Wrapper>
      <NavLink to="/" icon={FlameIcon} title="Timeline" />
      <NavLink to="/projects" icon={KanbanIcon} title="Projects" />
      <NavLink to="/packages" icon={BoxIcon} title="Packages" />
      {isDynamic ? (
        <NavLink to={location.pathname} title={dynamicPathName} />
      ) : null}
    </Wrapper>
  );
};
