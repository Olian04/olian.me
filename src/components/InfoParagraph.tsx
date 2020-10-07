import React from 'react';
import styled from 'styled-components';
import { DarkTheme } from '../themes/dark';

const Paragraph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
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
  small: boolean;
};
const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: ${props => props.flipped ? 'row-reverse' : 'row'};
  align-items: ${props => props.small ? 'center' : 'flex-start'};
  max-height: ${props => props.hidden ? '0' : '100%'};
  text-align: ${props => props.flipped ? 'right' : 'left'};
  height: 100%;
  width: auto;

  & > :first-child {
    ${props => props.flipped ? 'margin-left: 10px;' : 'margin-right: 10px;'}
  }
`;

type ImageProps = {
  small: boolean;
}
const Image = styled.img<ImageProps>`
  position: relative;
  display: block;
  transition: all 0.2s ease-out;
  max-height: ${props => props.small ? '50px' : '100%'};
  border-radius: ${props => props.small ? '50%' : '10px'};
  height: 100%;
  width: auto;
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
      small={small ?? false}
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
