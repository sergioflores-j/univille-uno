import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
  ${() => css`
    background-color: green;
  `}
`;

export const Content = styled.div`
  display: grid;
  grid-template-areas:
    'empty player1 empty2'
    'empty discardpile pile'
    'empty player2 uno';
  grid-template-columns: 10% 70% 20%;
  grid-template-rows: 25% 45% 30%;
  gap: 10px;
  padding: 20px;
  height: calc(100vh - 215px);

  ${media.lessThan('large')`
    grid-template-areas:
      'player1 empty2'
      'discardpile pile'
      'player2 uno';
    grid-template-columns: 80% 20%;
    grid-template-rows: 25% 45% 30%;
  `}
`;

export const Empty = styled.div`
  grid-area: empty;
`;

export const Empty2 = styled.div`
  grid-area: empty2;
`;

const modifiers = {
  flexRow: () => css`
    display: flex;
    flex-direction: row;
  `,
  flexCenter: () => css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export const QuantityIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 30px;
  margin: 10px;
  max-width: 100%;
  font-size: 38px;
`;

export const CardsArea = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow-x: auto;
`;

export const Player1 = styled.div`
  grid-area: player1;
  background-color: white;
  ${modifiers.flexRow()}
`;

export const Player2 = styled.div`
  grid-area: player2;
  background-color: white;
  ${modifiers.flexRow()}
`;

export const DiscardPile = styled.div`
  grid-area: discardpile;
  background-color: yellow;
  border-radius: 50%;
  ${modifiers.flexCenter()}
`;

export const Pile = styled.div`
  grid-area: pile;
  background-color: yellow;
  border-radius: 50%;
  ${modifiers.flexCenter()}
`;

export const Uno = styled.div`
  grid-area: uno;
  ${modifiers.flexCenter()}
`;
