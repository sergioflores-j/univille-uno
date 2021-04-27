import { PlayerProvider } from 'context/player';
import { ThemeProvider } from 'styled-components';

import Routes from 'Routes';
import GlobalStyles from './styles/global';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PlayerProvider>
        <Routes />
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;
