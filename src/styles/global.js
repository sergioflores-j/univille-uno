import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    :root {
      --scrollbarBG: #e2e2e2;
      --thumbBG: #828282;
    }

    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    * {
      &::-webkit-scrollbar {
        width: 11px;
      }

      &::-webkit-scrollbar-track {
        background: var(--scrollbarBG);
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--thumbBG);
        border-radius: 6px;
        border: 3px solid var(--scrollbarBG);
      }
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
      scrollbar-width: thin;
      scrollbar-color: var(--thumbBG) var(--scrollbarBG);
    }

    @media only screen and (max-width: 480px) {
      html {
        font-size: 100%;
      }
    }

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
