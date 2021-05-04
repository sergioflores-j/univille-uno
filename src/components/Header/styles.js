import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    position: sticky;
    top: 0;
    padding: 0 ${theme.spacings.xxsmall};
    border: 1px solid black;
    background-color: #f7f7f7;
    box-shadow: 6px 4px 24px 0px #000000;
    border-radius: 8px;
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
  ${({ theme, isCollapsed }) => css`
    display: flex;
    align-items: center;
    padding: ${!!isCollapsed && theme.spacings.xxsmall};
  `}
`;

export const HideToggle = styled.div`
  ${({ isCollapsed }) => css`
    font-size: 20px;
    position: absolute;
    margin-top: -20px;
    right: 50%;

    &::after {
      content: ${isCollapsed ? "'∨'" : "'∧'"};
      cursor: pointer;
    }
  `}
`;
