/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useChangePlayer, usePlayer } from 'context/player';

import * as S from './styles';

const Start = () => {
  const player = usePlayer();
  const changePlayer = useChangePlayer();
  const history = useHistory();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleStart = useCallback(() => {
    console.log('starting...', player);

    if (player.name) {
      history.push('/game');
    }
  }, [history, player]);

  return (
    <S.Wrapper>
      <S.Content>
        <S.Input>
          <label htmlFor="nameInput">Player name</label>
          <input
            id="nameInput"
            ref={inputRef}
            value={player.name}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleStart();
              }
            }}
            onChange={e => changePlayer(p => ({ ...p, name: e.target.value }))}
          />
        </S.Input>
        <button type="button" onClick={handleStart} disabled={!player.name}>
          Start
        </button>
      </S.Content>
    </S.Wrapper>
  );
};

export default Start;
