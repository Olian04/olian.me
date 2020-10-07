import React from 'react';
import styled from 'styled-components';
import { DarkTheme } from '../themes/dark';

const Container = styled.div``;

const Image = styled.img``;

const Overlay = styled.div``;

export enum Status {
  WIP,
  ARCHIVED,
  COMPLETED
}

type Props = {
  imgUrl: string;
  title: string;
  description: string;
  status: Status;
  badges: JSX.Element[];
}
export const Card = ({
  imgUrl,
  title,
  description,
  status,
  badges
}: Props) => {
  return (
    <Container>
      <Image 
        alt={title}
        src={imgUrl}
      />
      <Overlay>
        {/* WIP */}
      </Overlay>
    </Container>
  );
}
