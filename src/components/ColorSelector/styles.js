import styled, { css } from 'styled-components';
import { cardColorMap } from 'constants/index';

export const ColorSelector = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  color: white;

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      &::before {
        content: '>';
        margin: 2px;
      }
    }
  }

  input {
    display: none;
  }
`;

export const ColorSelectorSquare = styled.div`
  ${({ color }) => css`
    display: flex;
    background-color: ${cardColorMap[color]};
    width: 20px;
    height: 20px;
    margin: 5px;
  `}
`;
