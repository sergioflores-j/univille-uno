import { PlayerProvider } from 'context/player';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'Routes';
import GlobalStyles from './styles/global';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PlayerProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;
