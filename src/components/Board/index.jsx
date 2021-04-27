import React from 'react';

import UnoButton from 'components/UnoButton';
import Card from 'components/Card';

import * as S from './styles';

const ColorSelector = ({ onChange }) => (
  <S.ColorSelector>
    Select Color:
    <label htmlFor="select-blue">
      <S.ColorSelectorSquare color="blue" />
      Blue{' '}
      <input
        id="select-blue"
        type="radio"
        name="color"
        value="blue"
        onClick={() => onChange('blue')}
      />
    </label>
    <label htmlFor="select-red">
      <S.ColorSelectorSquare color="red" />
      Red{' '}
      <input
        id="select-red"
        type="radio"
        name="color"
        value="red"
        onClick={() => onChange('red')}
      />
    </label>
    <label htmlFor="select-yellow">
      <S.ColorSelectorSquare color="yellow" />
      Yellow{' '}
      <input
        id="select-yellow"
        type="radio"
        name="color"
        value="yellow"
        onClick={() => onChange('yellow')}
      />
    </label>
    <label htmlFor="select-green">
      <S.ColorSelectorSquare color="green" />
      Green{' '}
      <input
        id="select-green"
        type="radio"
        name="color"
        value="green"
        onClick={() => onChange('green')}
      />
    </label>
  </S.ColorSelector>
);

const Board = ({
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
          <Card {...lastPlayedCard} key={lastPlayedCard?.id} />

          {lastPlayedCard?.color === 'special' && (
            <ColorSelector onChange={onSetCardColor} />
          )}
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
