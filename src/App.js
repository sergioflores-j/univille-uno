import logo from './assets/UNO_Logo.svg';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <header>
          <img src={logo} alt="logo" />
        </header>
      </div>
    </>
  );
}

export default App;
