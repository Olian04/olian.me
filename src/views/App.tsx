import React from 'react';
import styled from 'styled-components';
import useScrollPosition from '@react-hook/window-scroll';
import { LandingPage } from './LandingPage';
import { ProjectList } from './ProjectList';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
`;

export const App = () => {
  return (
    <Wrapper>
      <LandingPage />
      <ProjectList />
    </Wrapper>
  )
};