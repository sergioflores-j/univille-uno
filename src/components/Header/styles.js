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
