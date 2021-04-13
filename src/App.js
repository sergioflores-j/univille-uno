import { PlayerProvider } from 'context/player';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Frame from './components/Frame';
import PageBase from './components/PageBase';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import Game from './views/Game';
import Start from './views/Start';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PlayerProvider>
        <BrowserRouter>
          <Frame>
            <Switch>
              <Redirect exact path="/" to="/start" />
              <Route path="/start">
                <PageBase>
                  <Start />
                </PageBase>
              </Route>
              <Route path="/game">
                <PageBase>
                  <Game />
                </PageBase>
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Frame>
        </BrowserRouter>
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;
