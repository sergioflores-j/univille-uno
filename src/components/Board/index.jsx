import React from 'react';

import UnoButton from 'components/UnoButton';
import Card from 'components/Card';
import ColorSelector from 'components/ColorSelector';

import * as S from './styles';

const Board = ({
  currentPlayer,
  discardedPile,
  players,
  unoedPlayers,
  onCallUno,
  onDrawCards,
  onCardClick = () => {},
  onSetCardColor = () => {},
}) => {
  const [bot, player] = players;
  const lastPlayedCard = discardedPile[discardedPile.length - 1];

  return (
    <S.Wrapper>
      <S.Content>
        <S.Empty />

        <S.Player1 isActive={currentPlayer === 0}>
          <S.PlayerHud>
            <S.QuantityIndicator>{bot?.cards.length}</S.QuantityIndicator>
            <S.PlayerName>{bot?.name}</S.PlayerName>
          </S.PlayerHud>
          <S.CardsArea>
            {bot?.cards.map(({ id }) => (
              <Card card="back" key={`botcard-${id}`} />
            ))}
          </S.CardsArea>
        </S.Player1>

        <S.Empty2 />

        <S.DiscardPile>
          <Card {...lastPlayedCard} key={lastPlayedCard?.id} />

          {lastPlayedCard?.color === 'special' && (
            <ColorSelector onChange={onSetCardColor} />
          )}
        </S.DiscardPile>

        <S.Pile isActive={currentPlayer === 1}>
          <Card
            card="back"
            onClick={onDrawCards}
            clickable={currentPlayer === 1}
          />
        </S.Pile>

        <S.Uno>
          {!!unoedPlayers.length && <UnoButton onClick={onCallUno} />}
        </S.Uno>

        <S.Player2 isActive={currentPlayer === 1}>
          <S.PlayerHud>
            <S.QuantityIndicator>{player?.cards.length}</S.QuantityIndicator>
            <S.PlayerName>{player?.name}</S.PlayerName>
          </S.PlayerHud>
          <S.CardsArea>
            {player?.cards.map(({ id, ...card }) => (
              <Card
                {...card}
                clickable={currentPlayer === 1}
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
