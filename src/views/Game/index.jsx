import { usePlayer } from 'context/player';
import React from 'react';

const Game = () => {
  const player = usePlayer();

  return (
    <>
      <h1>Game</h1>
      <div>Hello, {player.name}</div>
    </>
  );
};

export default Game;
