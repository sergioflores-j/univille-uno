import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();
const ChangePlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [state, setState] = useState({ name: '' });

  return (
    <PlayerContext.Provider value={state}>
      <ChangePlayerContext.Provider value={setState}>
        {children}
      </ChangePlayerContext.Provider>
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used inside its provider.');
  }
  return context;
}

export function useChangePlayer() {
  const context = useContext(ChangePlayerContext);
  if (context === undefined) {
    throw new Error('useChangePlayer must be used inside its provider.');
  }
  return context;
}
