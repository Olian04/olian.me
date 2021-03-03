import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { IColorTheme } from './interfaces/ColorTheme';
import { TimelineRoute } from './routes/TimelineRoute';
import { PackagesRoute } from './routes/PackagesRoute';
import { ProjectsRoute } from './routes/ProjectsRoute';
import { DetailsRoute } from './routes/DetailsRoute';
import { colorTheme } from './state/theme';
import { SidebarView } from './views/SidebarView';
import { NavigationView } from './views/NavigationView';

declare module 'styled-components' {
  export interface DefaultTheme extends IColorTheme {}
}

const navHeight = 70;
const sidebarWidth = 200;
const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  color: ${({ theme }) => theme.text.medium};
`;

const Layout = styled.div`
  position: relative;
  grid-area: page;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: auto;
  overflow-y: scroll;
`;

const TopBanner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: ${navHeight}px;
  background: ${({ theme }) => theme.background.E0};
  border: ${({ theme }) => theme.background.E16} solid 1px;
  border-right: none;
  border-left: none;
`;

const NavigationLayout = styled.div`
  position: relative;
  width: 100%;
  height: ${navHeight}px;
  display: grid;
  grid-template-columns: ${sidebarWidth}px auto;
  grid-template-rows: 1fr;
  grid-gap: 16px;
  align-items: flex-end;
`;

const SidebarWrapper = styled.div`
  position: relative;
  grid-area: sidebar;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const ContentWrapper = styled.div`
  position: relative;
  grid-area: content;
  width: 100%;
  height: 100%;
`;

export const App = () => {
  const theme = useRecoilValue(colorTheme);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <TopBanner />
        <Wrapper>
          <NavigationLayout>
            <div style={{ zIndex: -1 }}>{/* Sidebar space filler */}</div>
            <NavigationView />
          </NavigationLayout>
          <Layout>
            <SidebarWrapper>
              <SidebarView />
            </SidebarWrapper>
            <ContentWrapper>
              <Switch>
                <Route exact path="/projects" component={ProjectsRoute} />
                <Route exact path="/packages" component={PackagesRoute} />
                <Route exact path="/details" component={DetailsRoute} />
                <Route path="/" component={TimelineRoute} />
              </Switch>
            </ContentWrapper>
          </Layout>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};
