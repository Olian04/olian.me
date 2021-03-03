import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ITimelineEntry } from '../../interfaces/TimelineEntry';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
`;

const PrimaryLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.highlight.bright};
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SecondaryLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.text.medium};
  font-size: 12px;
  text-decoration: none;

  padding-left: 5px;

  &:hover {
    color: ${({ theme }) => theme.highlight.bright};
  }
`;

const Date = styled.div`
  position: absolute;
  display: block;
  width: auto;
  color: ${({ theme }) => theme.text.medium};
  font-size: 12px;
  right: 0;
`;

export const TimelineEntry = (props: ITimelineEntry) => {
  const history = useHistory();
  return (
    <Wrapper>
      <span style={{ width: '100%' }}>
        <PrimaryLink
          href={props.primaryLink.path}
          target="_blank"
          onClick={(ev) => {
            if (props.primaryLink.type === 'external') return;
            ev.preventDefault();
            history.push(props.primaryLink.path);
          }}
        >
          {props.primaryLink.title}
        </PrimaryLink>
        <SecondaryLink
          href={props.secondaryLink.path}
          target="_blank"
          onClick={(ev) => {
            if (props.secondaryLink.type === 'external') return;
            ev.preventDefault();
            history.push(props.secondaryLink.path);
          }}
        >
          {props.secondaryLink.title}
        </SecondaryLink>
      </span>
      <Date>
        {props.date.toLocaleString('en-GB', {
          month: 'short',
        })}{' '}
        {props.date.toLocaleString('en-GB', {
          day: 'numeric',
        })}
      </Date>
    </Wrapper>
  );
};
