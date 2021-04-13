import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 50vh;
  `}
`;
