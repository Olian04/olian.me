import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  position: relative;
  width: 100%;
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -30%);
  border-radius: 50%;
  z-index: 9000;
`;

interface Props {
  url: string;
}

export const Headshot = (props: Props) => {
  return <Image src={props.url} />;
};
