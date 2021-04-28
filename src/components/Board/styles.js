import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
  `}
`;

export const Content = styled.div`
  display: grid;
  grid-template-areas:
    'empty player1 empty2'
    'empty discardpile pile'
    'empty player2 uno';
  grid-template-columns: 10% 70% 20%;
  grid-template-rows: 27% 43% 30%;
  gap: 10px;
  padding: 20px;
  height: calc(100vh - 215px);

  ${media.lessThan('large')`
    grid-template-areas:
      'player1 empty2'
      'discardpile pile'
      'player2 uno';
    grid-template-columns: 80% 20%;
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
  playerArea: () => css`
    display: flex;
    flex-direction: column;
    padding: 5px;
    border-radius: 8px;
  `,
  activeArea: () => css`
    box-shadow: 2px 0px 20px 9px white;
  `,
};

export const PlayerHud = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 30px;
  margin: 10px;
  max-width: 100%;
`;

export const QuantityIndicator = styled.p`
  font-size: 38px;
`;

export const PlayerName = styled.p`
  font-size: 18px;
`;

export const CardsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 100px));
  gap: 5px;
  max-width: 100%;
  overflow: auto;
  padding: 0 10px;

  &::-webkit-scrollbar {
    width: 18px;
  }
`;

export const Player1 = styled.div`
  ${({ theme, isActive }) => css`
    grid-area: player1;
    background-color: ${theme.colors.secondary};
    ${modifiers.playerArea()}
    flex-direction: column-reverse;

    ${isActive && modifiers.activeArea()}
  `}
`;

export const Player2 = styled.div`
  ${({ theme, isActive }) => css`
    grid-area: player2;
    background-color: ${theme.colors.secondary};
    ${modifiers.playerArea()}

    ${isActive && modifiers.activeArea()}
  `}
`;

export const DiscardPile = styled.div`
  ${({ theme }) => css`
    grid-area: discardpile;
    background-color: ${theme.colors.alternative};
    border-radius: 10px;
    ${modifiers.flexCenter()}
  `}
`;

export const Pile = styled.div`
  ${({ theme, isActive }) => css`
    grid-area: pile;
    background-color: ${theme.colors.secondary};
    border-radius: 10px;
    ${modifiers.flexCenter()}
    ${isActive && modifiers.activeArea()}
  `}
`;

export const Uno = styled.div`
  grid-area: uno;
  ${modifiers.flexCenter()}
`;
