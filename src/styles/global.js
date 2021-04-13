import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html,
    body {
      min-height: 100%;
      font-size: 1.5rem;
      margin: 0;
      padding: 0;
      font-weight: 400;
      line-height: 2rem;
      text-transform: initial;
      letter-spacing: initial;
      color: var(--p-text, ${theme.colors.blackBlue});
      font-family: ${theme.font.family};
      word-wrap: break-word;
      font-kerning: normal;
      -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      background-color: ${theme.colors.white};
    }

    body {
      font-size: ${theme.font.sizes.small};
    }

    @media only screen and (max-width: 480px) {
      html {
        font-size: 100%;
      }
    }

    html,
    body,
    button {
      font-family: ${theme.font.family};
    }

    html {
      position: relative;
      font-size: 62.5%;
      -webkit-text-size-adjust: 100%;
      text-size-adjust: 100%;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      overflow-y: scroll;
    }
  `}
`;

export default GlobalStyles;
