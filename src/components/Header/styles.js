import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    position: sticky;
    top: 0;
    padding: 0 ${theme.spacings.xxsmall};
    border: 1px solid black;
    align-items: center;
  `}
`;

export const Logo = styled.img`
  ${({ theme }) => css`
    padding: 0 ${theme.spacings.xxsmall};
    cursor: pointer;
    max-width: 150px;
    max-height: 150px;
  `}
`;

export const Heading = styled.h1`
  ${() => css``}
`;

export const Content = styled.div`
  ${() => css`
    margin: 15px;
  `}
`;
