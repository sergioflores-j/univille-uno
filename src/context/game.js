import { generateCardsPile } from 'functions/pile';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePlayer } from './player';

export const GameContext = createContext();
export const ChangeGameContext = createContext();

export function GameProvider({ children }) {
  const player = usePlayer();

  const [state, setState] = useState({
    winner: null,
    firstCard: {},
    initialBotCards: [],
    initialPlayerCards: [],
    remainingCards: [],
  });

  useEffect(() => {
    const generatedPile = generateCardsPile();
    setState(oldState => ({
      ...oldState,
      // ? Randomically chooses who starts playing
      initialPlayer: Math.floor(Math.random() * 2),
      firstCard: generatedPile[0],
      initialBotCards: generatedPile.slice(1, 8),
      initialPlayerCards: generatedPile.slice(8, 15),
      remainingCards: generatedPile.slice(15),
    }));
  }, [player]);

  return (
    <GameContext.Provider value={state}>
      <ChangeGameContext.Provider value={setState}>
        {children}
      </ChangeGameContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used inside its provider.');
  }
  return context;
}

export function useChangeGame() {
  const context = useContext(ChangeGameContext);
  if (context === undefined) {
    throw new Error('useChangeGame must be used inside its provider.');
  }
  return context;
}
