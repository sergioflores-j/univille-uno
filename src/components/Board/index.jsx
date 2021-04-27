import React from 'react';

import UnoButton from 'components/UnoButton';
import Card from 'components/Card';

import * as S from './styles';

const Board = ({
  discardedPile,
  players,
  unoedPlayers,
  onCallUno,
  onDrawCards,
  onCardClick = () => {},
}) => {
  const [bot, player] = players;

  return (
    <S.Wrapper>
      <S.Content>
        <S.Empty />

        <S.Player1>
          <S.QuantityIndicator>{bot?.cards.length}</S.QuantityIndicator>
          <S.CardsArea>
            {bot?.cards.map(({ id }) => (
              <Card card="back" key={`botcard-${id}`} />
            ))}
          </S.CardsArea>
        </S.Player1>

        <S.Empty2 />

        <S.DiscardPile>
          <Card
            {...discardedPile[discardedPile.length - 1]}
            key={discardedPile[discardedPile.length - 1]?.id}
          />
        </S.DiscardPile>

        <S.Pile>
          <Card card="back" onClick={onDrawCards} clickable />
        </S.Pile>

        <S.Uno>
          {!!unoedPlayers.length && <UnoButton onClick={onCallUno} />}
        </S.Uno>

        <S.Player2>
          <S.QuantityIndicator>{player?.cards.length}</S.QuantityIndicator>
          <S.CardsArea>
            {player?.cards.map(({ id, ...card }) => (
              <Card
                {...card}
                clickable
                onClick={() => onCardClick({ id, ...card })}
                key={`playercard-${id}`}
              />
            ))}
          </S.CardsArea>
        </S.Player2>
      </S.Content>
    </S.Wrapper>
  );
};

export default Board;
