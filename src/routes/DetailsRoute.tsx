import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { LoadingGif } from '../components/common/LoadingGif';

const Wrapper = styled.div`
  position: relative;
`;

export const DetailsRoute = () => {
  return (
    <React.Suspense fallback={LoadingGif}>
      <Wrapper>Details</Wrapper>
    </React.Suspense>
  );
};
