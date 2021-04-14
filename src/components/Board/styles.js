import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${() => css`
    background-color: green;
  `}
`;

export const Content = styled.div`
  display: grid;
  grid-template-areas:
    'empty player1 pile'
    'empty discardpile pile'
    'empty player2 uno';
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 25% 45% 30%;
  height: 78vh;
`;

export const Empty = styled.div`
  grid-area: empty;
`;

export const Player1 = styled.div`
  grid-area: player1;
  background-color: yellow;
`;

export const Player2 = styled.div`
  grid-area: player2;
  background-color: red;
`;

export const DiscardPile = styled.div`
  grid-area: discardpile;
  background-color: blue;
`;

export const Pile = styled.div`
  grid-area: pile;
  background-color: aliceblue;
`;

export const Uno = styled.div`
  grid-area: uno;
  background-color: white;
`;
