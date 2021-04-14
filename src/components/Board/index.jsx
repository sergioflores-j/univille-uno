import React from 'react';

import { usePlayer } from 'context/player';

import * as S from './styles';

const Board = () => {
  const player = usePlayer();

  return (
    <S.Wrapper>
      <h1>Board</h1>
      <div>Hello, {player.name}</div>

      <S.Content>
        <S.Empty />
        <S.Player1>Bot</S.Player1>
        <S.DiscardPile>DiscardPile</S.DiscardPile>
        <S.Pile>Pile</S.Pile>
        <S.Uno>Uno</S.Uno>
        <S.Player2>{player.name}</S.Player2>
      </S.Content>
    </S.Wrapper>
  );
};

export default Board;
