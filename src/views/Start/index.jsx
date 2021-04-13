import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useChangePlayer, usePlayer } from 'context/player';

import * as S from './styles';

const Start = () => {
  const player = usePlayer();
  const changePlayer = useChangePlayer();
  const history = useHistory();

  const handleStart = useCallback(() => {
    console.log('starting...', player);

    if (player.name) {
      history.push('/game');
    }
  }, [history, player]);

  return (
    <S.Wrapper>
      <h1>Start</h1>
      <label htmlFor="nameInput">
        Player name:
        <input
          id="nameInput"
          value={player.name}
          onChange={e => changePlayer(p => ({ ...p, name: e.target.value }))}
        />
      </label>
      <button type="button" onClick={handleStart} disabled={!player.name}>
        Start
      </button>
    </S.Wrapper>
  );
};

export default Start;
