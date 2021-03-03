import React from 'react';
import styled from 'styled-components';

import { Headshot } from '../components/sidebar/Headshot';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  width: 200px;
  height: auto;
`;

const GITHUB_PROFILE_PICTURE =
  'https://avatars.githubusercontent.com/u/5493406?s=460&u=362040e129e2470199449a2aa5f9277c61397913&v=4';

export const SidebarView = () => {
  // TODO: Headshot should overlap
  return (
    <Wrapper>
      <Headshot url={GITHUB_PROFILE_PICTURE} />
    </Wrapper>
  );
};
