import React, { useCallback, useEffect, useRef, useState } from 'react';

import Board from 'components/Board';
import { usePlayer } from 'context/player';
import { shuffle } from 'utils/array';
import { useGame } from 'context/game';

const Game = () => {
  const player = usePlayer();
  const game = useGame();
  const mounted = useRef(false);
  const gameStarted = useRef(false);
  const [pile, setPile] = useState([]);
  const [discardedPile, setDiscardedPile] = useState([]);
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Crazy frog (bot)',
      isHuman: false,
      cards: [],
    },
    {
      id: 2,
      name: player.name,
      isHuman: true,
      cards: [],
    },
  ]);

  const pileSelfHeal = useCallback(() => {
    if (pile.length === 0) {
      setPile(shuffle(discardedPile));
      setDiscardedPile([]);
    }
  }, [pile, discardedPile]);

  const setPlayerCards = (playerIndex, cards) =>
    setPlayers(old => {
      const copy = [...old];
      copy[playerIndex] = { ...copy[playerIndex], cards };

      return copy;
    });

  const drawCardsFromPile = useCallback(
    (quantity = 1) => {
      if (!pile.length) return [];

      const drawedCards = pile.slice(0, quantity);

      setPile(old => [...old.slice(quantity - 1)]);

      return drawedCards;
    },
    [pile]
  );

  const drawCards = useCallback(
    (playerIndex, quantity = 1) => {
      if (!players[playerIndex]) return;

      const { cards } = players[playerIndex];

      setPlayerCards(playerIndex, [...cards, drawCardsFromPile(quantity)]);
    },
    [drawCardsFromPile, players]
  );

  const start = useCallback(() => {
    if (!game.remainingCards.length) return;

    setDiscardedPile([game.firstCard]);
    setPlayerCards(0, game.initialBotCards);
    setPlayerCards(1, game.initialPlayerCards);
    setPile(game.remainingCards);

    gameStarted.current = true;
  }, [game]);

  useEffect(() => {
    if (!mounted.current) return;

    pileSelfHeal();
  }, [pileSelfHeal]);

  useEffect(() => {
    if (mounted.current) return;

    setPlayers(old => {
      const copy = [...old];
      copy[1].name = player.name;

      return [...copy];
    });
  }, [player]);

  useEffect(() => {
    if (gameStarted.current) return;

    start();
  }, [start]);

  useEffect(() => {
    if (mounted.current) return;

    mounted.current = true;
  }, []);

  return (
    <>
      <h1>Game</h1>

      <Board
        pile={pile}
        discardedPile={discardedPile}
        players={players}
        onDrawCards={drawCards}
      />
    </>
  );
};

export default Game;
