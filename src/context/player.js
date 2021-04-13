import React from 'react';

const PlayerContext = React.createContext();
const ChangePlayerContext = React.createContext();

export function PlayerProvider({ children }) {
  const [state, setState] = React.useState({ name: '' });

  return (
    <PlayerContext.Provider value={state}>
      <ChangePlayerContext.Provider value={setState}>
        {children}
      </ChangePlayerContext.Provider>
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = React.useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used inside its provider.');
  }
  return context;
}

export function useChangePlayer() {
  const context = React.useContext(ChangePlayerContext);
  if (context === undefined) {
    throw new Error('useChangePlayer must be used inside its provider.');
  }
  return context;
}
