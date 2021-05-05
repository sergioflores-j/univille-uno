import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    min-height: 50vh;
    font-size: 28px;
    color: white;
  `}
`;

export const Highlight = styled.div`
  ${() => css`
    font-size: 36px;
    font-weight: bold;
  `}
`;
