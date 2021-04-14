import Board from 'components/Board';
import { usePlayer } from 'context/player';
import React from 'react';

const Game = () => {
  const player = usePlayer();

  console.log('player', player);
  return (
    <>
      <h1>Game</h1>

      <Board />
    </>
  );
};

export default Game;
