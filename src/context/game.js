import { generateCardsPile } from 'functions/pile';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePlayer } from './player';

const GameContext = createContext();
const ChangeGameContext = createContext();

export function GameProvider({ children }) {
  const player = usePlayer();

  const [state, setState] = useState({
    firstCard: {},
    initialBotCards: [],
    initialPlayerCards: [],
    remainingCards: [],
  });

  useEffect(() => {
    const generatedPile = generateCardsPile();
    setState({
      firstCard: generatedPile[0],
      initialBotCards: generatedPile.slice(1, 8),
      initialPlayerCards: generatedPile.slice(8, 14),
      remainingCards: generatedPile.slice(15),
    });
  }, [player]);

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
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
