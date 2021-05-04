import React, { useEffect } from 'react';
import { GameProvider } from 'context/game';
import { usePlayer } from 'context/player';
import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Frame from './components/Frame';
import PageBase from './components/PageBase';
import Game from './views/Game';
import PostGame from './views/PostGame';
import Start from './views/Start';

const darkPages = ['/game', '/postgame'];

function Routes() {
  const player = usePlayer();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!player.name) {
      history.push('/start');
    }
  }, [history, player.name]);

  return (
    <Frame isDark={darkPages.includes(location.pathname)}>
      <Switch>
        <Redirect exact path="/" to="/start" />
        <Route path="/start">
          <PageBase>
            <Start />
          </PageBase>
        </Route>
        <Route path="/game">
          <PageBase>
            <GameProvider>
              <Game />
            </GameProvider>
          </PageBase>
        </Route>
        <Route path="/postgame">
          <PageBase>
            <GameProvider>
              <PostGame />
            </GameProvider>
          </PageBase>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Frame>
  );
}

export default Routes;
