import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { timelineGroups } from '../state/timeline';
import { TimelineGroup } from '../components/timeline/TimelineGroup';
import { TimelineEntry } from '../components/timeline/TimelineEntry';
import { iconNameMap } from '../icons';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;

  padding-bottom: 15px;

  &::before {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.background.E6};
    width: 2px;
    height: 100%;
    left: 13px;
  }
`;

export const TimelineView = () => {
  const timelineData = useRecoilValue(timelineGroups);

  return (
    <Wrapper>
      {timelineData.map((group, i) => (
        <TimelineGroup
          icon={iconNameMap[group.iconName]}
          title={group.title}
          key={i}
        >
          {group.entries.map((entry, k) => (
            <TimelineEntry {...entry} key={k} />
          ))}
        </TimelineGroup>
      ))}
    </Wrapper>
  );
};
