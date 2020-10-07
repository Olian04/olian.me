import React from 'react';
import styled from 'styled-components';
import { DarkTheme } from '../themes/dark';

type ShadowWrapperProps = {
  height: string;
  hidden: boolean;
}
const ShadowWrapper = styled.div<ShadowWrapperProps>`
  position: relative;
  display: block;
  z-index: 5;
  width: 100%;
  height: ${props => props.height};
  filter: drop-shadow(-1px 6px 3px rgba(0,0,0,0.44));

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: transparent;
    filter: blur(5px);
    transition: opacity 0.2s linear;
    opacity: ${props => props.hidden ? '0' : '1'};
  }
  &::after {
    content: 'Projects';
    position: absolute;
    left: 50%;
    top: 50%;
    color: ${DarkTheme.text.disabled};
    font-size: 4rem;
    transform: translate(-50%, -10px);
    transition: opacity 0.2s linear;
    opacity: ${props => props.hidden ? '0' : '1'};
  }
`;

type DiagonalClipProps = {
  height: string;
}
const DiagonalClip = styled.div<DiagonalClipProps>`
  position: relative;
  display: block;
  z-index: 5;
  width: 100%;
  top: -1px;
  height: ${props => props.height};
  background: ${DarkTheme.background.E1};
  clip-path: polygon(0% 0, 100% 0, 100% 100%, 0 10%);
`;

type Props = {
  onClick: () => void;
  height: string;
  clipHeight: string;
  hidden: boolean;
}

export const Preview = ({
  onClick,
  height,
  clipHeight,
  hidden,
}: Props) => {
  return (
    <ShadowWrapper
      hidden={hidden}
      height={height} 
      onClick={(ev) => {
        if (ev.target !== ev.currentTarget) return;
        onClick();
      }}
      onTouchStart={(ev) => {
        if (ev.target !== ev.currentTarget) return;
        onClick();
      }}
      >
      <DiagonalClip height={clipHeight} />
    </ShadowWrapper>
  );
}
