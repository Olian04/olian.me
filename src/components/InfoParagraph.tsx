import React from 'react';
import styled from 'styled-components';
import { DarkTheme } from '../themes/dark';

const Paragraph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${DarkTheme.text.medium};
`;

const ParagraphHeading = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${DarkTheme.text.high};
`;

type ContainerProps = {
  flipped: boolean;
  hidden: boolean;
};
const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: ${props => props.flipped ? 'row-reverse' : 'row'};
  justify-content: flex-start;
  max-height: ${props => props.hidden ? '0' : 'auto'};
  text-align: ${props => props.flipped ? 'right' : 'left'};

  & > :first-child {
    ${props => props.flipped ? 'margin-left: 10px;' : 'margin-right: 10px;'}
  }
`;

type ImageProps = {
  small: boolean;
}
const Image = styled.img<ImageProps>`
  position: relative;
  transition: all 0.2s ease-out;
  max-width: ${props => props.small ? '30px' : '100px'};
  max-height: ${props => props.small ? '30px' : '100px'};
  border-radius: ${props => props.small ? '50%' : '10px'};
`;

type Props = {
  imgUrl: string;
  heading: string;
  body: JSX.Element;
  flipped?: boolean;
  hidden?: boolean;
  small?: boolean;
}

export const InfoParagraph = ({
  imgUrl,
  body,
  heading,
  flipped,
  hidden,
  small
}: Props) => {
  return (
    <Container
      hidden={hidden ?? false}
      flipped={flipped ?? false}
      >
      <Image
        alt={'Information Paragraph'}
        src={imgUrl}
        small={small ?? false}
      />
      <Paragraph>
        <ParagraphHeading>
          {heading}
        </ParagraphHeading>
        {small ? '' : body}
      </Paragraph>
    </Container>
  );
}
