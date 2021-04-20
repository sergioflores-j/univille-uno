import React from 'react';

import * as S from './styles';

const Board = ({ pile, discardedPile, players }) => {
  const [bot, player] = players;

  return (
    <S.Wrapper>
      <h1>Board</h1>
      <div>Hello, {player?.name}</div>

      <S.Content>
        <S.Empty />
        <S.Player1>
          <ul>
            {bot?.cards.map(({ card }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`bot-card-${index}`}>{card}</li>
            ))}
          </ul>
        </S.Player1>
        <S.DiscardPile>
          DiscardPile
          <ul>
            {discardedPile.map(({ card }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`discarded-card-${index}`}>{card}</li>
            ))}
          </ul>
        </S.DiscardPile>
        <S.Pile>
          Pile
          <ul>
            {pile.map(({ card }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`pile-card-${index}`}>{card}</li>
            ))}
          </ul>
        </S.Pile>
        <S.Uno>Uno</S.Uno>
        <S.Player2>
          <ul>
            {player?.cards.map(({ card }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`bot-card-${index}`}>{card}</li>
            ))}
          </ul>
        </S.Player2>
      </S.Content>
    </S.Wrapper>
  );
};

export default Board;
