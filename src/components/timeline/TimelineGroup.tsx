import React, { ReactChild } from 'react';
import styled from 'styled-components';

const iconSize = 28;

const Wrapper = styled.div`
  position: relative;
  padding-top: 20px;
  width: 100%;
  height: auto;
`;

const Heading = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  font-size: 18px;
  color: ${({ theme }) => theme.text.high};
`;

const Icon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background.E12};
  width: ${iconSize}px;
  height: ${iconSize}px;
  border-radius: 50%;
`;

const ItemsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: ${iconSize + 10}px;
`;

interface Props {
  title: string;
  icon: (props: { height: number; width: number }) => JSX.Element;
  children?: ReactChild[] | ReactChild;
}

export const TimelineGroup = (props: Props) => {
  return (
    <Wrapper>
      <Heading>
        <Icon>
          <props.icon height={iconSize * 0.6} width={iconSize * 0.6} />
        </Icon>
        <span>{props.title}</span>
      </Heading>
      <ItemsWrapper>{props.children}</ItemsWrapper>
    </Wrapper>
  );
};
