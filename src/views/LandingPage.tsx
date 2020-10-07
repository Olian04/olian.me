import React, {useState} from 'react';
import styled from 'styled-components';
import { Preview } from '../components/Preview';
import { InfoParagraph } from '../components/InfoParagraph';
import imageOfMyFace from '../assets/Oliver.jpg';
import { DarkTheme } from '../themes/dark';

const bannerHeight = '70px';
const previewHeight = '85px';
const remainingHeight = `max(${previewHeight} + 10px, 25vh)`;
const blockHeight = `calc((100vh - ${remainingHeight}) / 3)`;

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
`;

type BannerProps = {
  extended: boolean;
}
const Banner = styled.div<BannerProps>`
  position: absolute;
  display: ${props => props.extended
    ? 'block'
    : 'flex'
  };
  z-index: 1000000;
  width: 100%;
  transition: all 0.2s ease-out;
  height: ${props => props.extended
    ? blockHeight
    : bannerHeight
  };
  padding: ${props => props.extended
    ? '35px'
    : '0 0 0 35px'
  };
  align-content: center;
  justify-items: center;
  align-items: center;
  background: ${DarkTheme.background.E1};
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
  background: ${DarkTheme.background.E1};
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
    <Wrapper extended={extended}>
      <Banner extended={extended} onClick={() => setExtended(true)}>
        <InfoParagraph
          imgUrl={imageOfMyFace}
          heading={'Oliver Anteros Linnarsson'}
          body={<p>Some info about me</p>}
          small={!extended}
        />
      </Banner>
      <Drawer extended={extended}>
        <Block></Block>
        <Block></Block>
        <Preview
          hidden={!extended}
          height={remainingHeight}
          clipHeight={previewHeight}
          onClick={()  => setExtended(false)}
          />
      </Drawer>
    </Wrapper>
  );
}
