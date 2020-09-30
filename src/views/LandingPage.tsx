import React from 'react';
import styled from 'styled-components';
import { InfoParagraph } from '../components/InfoParagraph';
import imageOfMyFace from '../assets/Oliver.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  max-height: 100%;
  padding: 0;
  margin: 40px;

  & > * {
    margin-bottom: 40px;
  }
`;

const ParagraphHeading = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

const Link = styled.a`
  border-bottom: dotted black 2px;
  text-decoration: none;
  color: black;

  &:hover {
    border-bottom-style: solid;
  }
`;

const thisYear = new Date().getFullYear();
const myBirthYear = 1995;
const myEmail = 'oliverli@kth.se';

type Props = {
  collapsed: boolean;
}
export const LandingPage = ({
  collapsed
}: Props) => {
  return (
    <Wrapper>
      <InfoParagraph
        imgUrl={imageOfMyFace}
        heading={<ParagraphHeading>Oliver Anteros Linnarsson</ParagraphHeading>}
        body={<span>He/Him, {thisYear - myBirthYear} years old</span>}
        small={collapsed}
      />

      <InfoParagraph
        imgUrl={imageOfMyFace}
        heading={<ParagraphHeading>Oliver Anteros Linnarsson</ParagraphHeading>}
        body={<span>He/Him, {thisYear - myBirthYear} years old</span>}
        flipped
        hidden={collapsed}
      />
      <InfoParagraph
        imgUrl={imageOfMyFace}
        heading={<ParagraphHeading>Oliver Anteros Linnarsson</ParagraphHeading>}
        body={<span>He/Him, {thisYear - myBirthYear} years old</span>}
        hidden={collapsed}
      />
      <InfoParagraph
        imgUrl={imageOfMyFace}
        heading={<ParagraphHeading>Contact Information</ParagraphHeading>}
        body={
          <>
            <span><Link href={`mailto:${myEmail}`}>{myEmail}</Link><b> :email</b></span>
            <span>dd</span>
          </>
        }
        flipped
        hidden={collapsed}
      />
    </Wrapper>
  );
}
