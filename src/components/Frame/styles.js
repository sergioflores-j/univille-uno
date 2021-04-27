import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};

    ${media.lessThan('medium')`
      padding: ${theme.spacings.xxsmall};
    `}
  `}
`;
