import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import theme from 'styles/theme';
import { GameProvider } from 'context/game';
import { PlayerProvider } from 'context/player';

const customRender = (Content, children) => {
  const { rerender, ...funcs } = render(<Content>{children}</Content>);

  return {
    ...funcs,
    rerender: c => rerender(<Content>{c}</Content>),
  };
};

export const renderWithTheme = children =>
  customRender(
    ({ children: c }) => <ThemeProvider theme={theme}>{c}</ThemeProvider>,
    children
  );

export const renderWithRouter = children =>
  customRender(
    ({ children: c }) => <BrowserRouter>{c}</BrowserRouter>,
    children
  );

export const renderWithThemeAndRouter = children =>
  customRender(
    ({ children: c }) => (
      <ThemeProvider theme={theme}>
        <BrowserRouter>{c}</BrowserRouter>
      </ThemeProvider>
    ),
    children
  );

export const renderWithFullContext = children =>
  customRender(
    ({ children: c }) => (
      <ThemeProvider theme={theme}>
        <PlayerProvider>
          <BrowserRouter>
            <GameProvider>{c}</GameProvider>
          </BrowserRouter>
        </PlayerProvider>
      </ThemeProvider>
    ),
    children
  );

export const renderWithPlayerContext = children =>
  customRender(
    ({ children: c }) => (
      <ThemeProvider theme={theme}>
        <PlayerProvider>
          <BrowserRouter>{c}</BrowserRouter>
        </PlayerProvider>
      </ThemeProvider>
    ),
    children
  );
