import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
      calledUno: false,
      cards: [],
    },
    {
      id: 2,
      name: player.name,
      isHuman: true,
      calledUno: false,
      cards: [],
    },
  ]);
  const unoedPlayers = useMemo(
    () => players.filter(p => p.cards.length === 1 && !p.calledUno),
    [players]
  );
  const calledUnoPlayers = useMemo(() => players.filter(p => p.calledUno), [
    players,
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

  const resetUno = useCallback(
    (playerIndex, oldCards, newCards) => {
      if (!calledUnoPlayers.length) return;

      if (
        calledUnoPlayers.some(p => p.id === players[playerIndex].id) &&
        newCards.length > 1 &&
        oldCards.length === 1
      ) {
        setPlayers(old => {
          const newP = [...old];

          newP[playerIndex].calledUno = false;

          return newP;
        });
      }
    },
    [calledUnoPlayers, players]
  );

  const onDrawCards = useCallback(
    (playerIndex, oldCards, newCards) => {
      resetUno(playerIndex, oldCards, newCards);
    },
    [resetUno]
  );

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

      const newCards = [...cards, drawCardsFromPile(quantity)];

      setPlayerCards(playerIndex, newCards);
      onDrawCards(playerIndex, cards, newCards);
    },
    [drawCardsFromPile, onDrawCards, players]
  );

  const start = useCallback(() => {
    if (!game.remainingCards.length) return;

    setDiscardedPile([game.firstCard]);
    setPlayerCards(0, game.initialBotCards);
    setPlayerCards(1, game.initialPlayerCards);
    setPile(game.remainingCards);

    gameStarted.current = true;
  }, [game]);

  const callUno = useCallback(
    callerId => {
      if (!unoedPlayers.length) return;

      // Only one player can be at "uno" state at a time
      const isSame = unoedPlayers[0].id === callerId;
      const pIndex = players.findIndex(p => p.id === unoedPlayers[0].id);

      if (!isSame) drawCards(pIndex, 2);

      setPlayers(old => {
        const newP = [...old];

        newP[pIndex].calledUno = true;

        return newP;
      });
    },
    [unoedPlayers, drawCards, players]
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
        unoedPlayers={unoedPlayers}
        onCallUno={() => callUno(2)}
      />
    </>
  );
};

export default Game;
