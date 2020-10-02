import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import { InfoParagraph } from '../components/InfoParagraph';
import imageOfMyFace from '../assets/Oliver.jpg';

const bannerHeight = '45px';
const previewHeight = '150px';
const blockHeight = `calc((100vh - ${previewHeight}) / 4)`;

type WrapperProps = {
  extended: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  display: fixed;
  position: absolute;
  z-index: 1000;
  width: 100vw;
  height: ${props => props.extended ? '100vh' : bannerHeight};
  box-shadow: 0px 3px 11px 0px rgba(0,0,0,0.44);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    filter: ${props => props.extended ? 'blur(5px)' : 'none'};
  }
`;

type BannerProps = {
  extended: boolean;
}
const Banner = styled.div<BannerProps>`
  position: absolute;
  display: block;
  z-index: 1000000;
  width: 100%;
  height: ${props => props.extended ? blockHeight : bannerHeight};
  background: skyblue;
  transition: height 0.2s ease-out;
`;

type DrawerProps = {
  extended: boolean;
}
const Drawer = styled.div<DrawerProps>`
  position: relative;
  display: block;
  width: 100%;
  height: calc(100vh - ${blockHeight});
  top: ${blockHeight};
  transition: height 0.2s ease-out, transform 0.2s ease-out;
  transform: ${props => props.extended
    ? 'translateY(0%)'
    : `translateY(calc(-100% - ${blockHeight} + ${bannerHeight}))`
  };
`;

const Block = styled.div`
  position: relative;
  display: block;
  z-index: 10;
  width: 100%;
  height: ${blockHeight};
  background: skyblue;
`;

const Preview = styled.div`
  position: relative;
  display: block;
  z-index: 5;
  width: 100%;
  height: ${previewHeight};
  background: skyblue;
  box-shadow: 0px 3px 11px 0px rgba(0,0,0,0.44);

  @media only screen and (max-width: 690px) {
    & {
      transform: skewY(11.25deg) translateY(calc(-1 * ${previewHeight} / 1.85));
    }
  }
  @media only screen and (min-width: 690px) {
    & {
      transform: skewY(7deg) translateY(calc(-1 * ${previewHeight} / 1.85));
    }
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

export const LandingPage = () => {
  const [extended, setExtended] = useState(true);

  return (
    <Wrapper extended={extended} onClick={ev => setExtended(false)}>
      <Banner extended={extended}></Banner>
      <Drawer extended={extended}>
        <Block></Block>
        <Block></Block>
        <Preview />
      </Drawer>
    </Wrapper>
  );
}
