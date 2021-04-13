import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    padding: ${theme.spacings.xxsmall};
  `}
`;
