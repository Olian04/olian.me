import React from 'react';
import styled from 'styled-components';
import { LoadingGif } from '../components/common/LoadingGif';

const Wrapper = styled.div`
  position: relative;
`;

export const PackagesRoute = () => {
  return (
    <React.Suspense fallback={LoadingGif}>
      <Wrapper>Packages</Wrapper>
    </React.Suspense>
  );
};
