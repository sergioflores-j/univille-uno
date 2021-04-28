import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
  ${({ theme, isDark }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
    background-color: ${isDark ? theme.colors.primary : '#f7f7f7f7'};

    ${media.lessThan('medium')`
      padding: ${theme.spacings.xxsmall};
    `}
  `}
`;
