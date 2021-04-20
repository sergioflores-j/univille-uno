import React, { useCallback, useEffect, useRef, useState } from 'react';

import Board from 'components/Board';
import { usePlayer } from 'context/player';
import { generateCardsPile } from 'functions/pile';
import { shuffle } from 'utils/array';

const generatedPile = generateCardsPile();
const [firstCard, initialBotCards, initialPlayerCards, rest] = [
  generatedPile[0],
  generatedPile.slice(1, 8),
  generatedPile.slice(8, 14),
  generatedPile.slice(15),
];

const Game = () => {
  const player = usePlayer();
  const mounted = useRef();
  const [pile, setPile] = useState(rest);
  const [discardedPile, setDiscardedPile] = useState([firstCard]);
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Crazy frog (bot)',
      isHuman: false,
      cards: initialBotCards,
    },
    {
      id: 2,
      name: player.name,
      isHuman: true,
      cards: initialPlayerCards,
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
