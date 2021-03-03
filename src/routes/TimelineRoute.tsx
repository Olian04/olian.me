import React from 'react';
import styled from 'styled-components';
import { LoadingGif } from '../components/common/LoadingGif';

import { TimelineView } from '../views/TimelineView';

const Wrapper = styled.div`
  position: relative;
`;

export const TimelineRoute = () => {
  return (
    <React.Suspense fallback={LoadingGif}>
      <Wrapper>
        <TimelineView />
      </Wrapper>
    </React.Suspense>
  );
};
