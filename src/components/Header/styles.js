import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    position: sticky;
    top: 0;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xxsmall}
      ${theme.spacings.small} ${theme.spacings.xxsmall};
  `}
`;

export const Logo = styled.img`
  ${({ theme }) => css`
    padding: 0 ${theme.spacings.xxsmall};
    cursor: pointer;
    max-width: 150px;
    max-height: 50px;
  `}
`;
