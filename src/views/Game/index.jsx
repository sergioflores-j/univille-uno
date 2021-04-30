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
import { useChangeGame, useGame } from 'context/game';
import { resetCards } from 'functions/pile';
import { colors, drawableCards, shouldSkipRoundPass } from 'constants/index';
import { delay, findPlayableCard, isPlayableCard } from 'utils/game';
import { useHistory } from 'react-router-dom';

const Game = () => {
  const player = usePlayer();
  const game = useGame();
  const changeGame = useChangeGame();
  const history = useHistory();

  const mounted = useRef(false);
  const gameStarted = useRef(false);
  const botDelayTimerId = useRef(null);

  const [rounds, setRounds] = useState(0);
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
  const [currentPlayer, setCurrentPlayer] = useState(-1);

  const unoedPlayers = useMemo(
    () => players.filter(p => p.cards.length === 1 && !p.calledUno),
    [players]
  );
  const winner = useMemo(() => players.find(p => p.cards.length === 0), [
    players,
  ]);
  const calledUnoPlayers = useMemo(() => players.filter(p => p.calledUno), [
    players,
  ]);

  const pileSelfHeal = useCallback(() => {
    setPile(old => [
      ...old,
      ...resetCards(shuffle(discardedPile.slice(0, discardedPile.length - 1))),
    ]);
    setDiscardedPile([discardedPile[discardedPile.length - 1]]);
  }, [discardedPile]);

  const setPlayerCards = (playerIndex, cards) =>
    setPlayers(old => {
      const copy = [...old];
      copy[playerIndex] = { ...copy[playerIndex], cards };

      return copy;
    });

  const removePlayerCard = (playerIndex, card) =>
    setPlayers(old => {
      const copy = [...old];
      copy[playerIndex] = {
        ...copy[playerIndex],
        cards: copy[playerIndex].cards.filter(c => c.id !== card.id),
      };

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

  const passRound = lastPlayedCard => {
    console.log('passRound - lastPlayedCard', lastPlayedCard);

    if (lastPlayedCard?.color === 'special') return;

    const condition = shouldSkipRoundPass.includes(lastPlayedCard?.card);

    console.log('passRound - check', condition);

    if (!condition) {
      setCurrentPlayer(c => {
        console.log('passRound - will pass round');

        if (players[c + 1]) return c + 1;

        return 0;
      });
    }

    setRounds(l => l + 1);
  };

  const onDrawCards = useCallback(
    (playerIndex, oldCards, newCards, { shouldPassRound = true } = {}) => {
      resetUno(playerIndex, oldCards, newCards);

      if (shouldPassRound) {
        console.log('onDrawCards - shouldPassRound');
        passRound();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resetUno]
  );

  const drawCardsFromPile = useCallback(
    (quantity = 1) => {
      if (!pile.length) return [];

      const drawedCards = pile.slice(0, quantity);

      setPile(old => [...old.slice(quantity)]);

      return drawedCards;
    },
    [pile]
  );

  const drawCards = useCallback(
    (playerIndex, quantity = 1, additionalParams) => {
      if (!players[playerIndex]) return;

      const { cards } = players[playerIndex];

      const newCards = [...cards, ...drawCardsFromPile(quantity)];

      setPlayerCards(playerIndex, newCards);
      onDrawCards(playerIndex, cards, newCards, additionalParams);
    },
    [drawCardsFromPile, onDrawCards, players]
  );

  const start = useCallback(() => {
    if (!game.remainingCards.length) return;

    setDiscardedPile([game.firstCard]);
    setPlayerCards(0, game.initialBotCards);
    setPlayerCards(1, game.initialPlayerCards);
    setPile(game.remainingCards);
    setCurrentPlayer(game.initialPlayer);
    setRounds(1);

    gameStarted.current = true;
  }, [game]);

  const onCallUno = () => {
    clearTimeout(botDelayTimerId.current);
    botDelayTimerId.current = null;
  };

  const callUno = useCallback(
    callerIndex => {
      if (!unoedPlayers.length) return;

      console.log('callUno - start');

      // Only one player can be at "uno" state at a time
      const [unoedPlayer] = unoedPlayers;

      const isSame = unoedPlayer.id === players[callerIndex].id;
      const unoedPlayerIndex = players.findIndex(p => p.id === unoedPlayer.id);

      if (!isSame) drawCards(unoedPlayerIndex, 2, { shouldPassRound: false });

      // ? Set all players as `calledUno`
      setPlayers(old => old.map(i => ({ ...i, calledUno: true })));
      onCallUno(callerIndex);
    },
    [unoedPlayers, drawCards, players]
  );

  const handleSetCardColor = useCallback(color => {
    console.log('handleSetCardColor - start');
    setDiscardedPile(p => {
      const copy = [...p];
      copy[copy.length - 1].color = color;

      passRound(copy[copy.length - 1]);

      return copy;
    });
  }, []);

  const onSelectCard = (playerIndex, card) => {
    if (drawableCards.includes(card.card)) {
      console.log(
        'onSelectCard - draw quantity',
        card.card.replace('draw', '')
      );

      drawCards(
        // ? Sets the other player to draw cards (change this when multiple players!!)
        playerIndex === 0 ? 1 : 0,
        Number(card.card.replace('draw', '')),
        {
          shouldPassRound: false,
        }
      );
    }

    passRound(card);
  };

  const handleSelectCard = useCallback(
    (playerIndex, card) => {
      console.log('handleSelectCard - card clicked', card);
      const lastPlayedCard = discardedPile[discardedPile.length - 1];

      if (!isPlayableCard(lastPlayedCard, card)) return;

      const playedCard = { ...card, playedBy: playerIndex, round: rounds };

      setDiscardedPile(old => [...old, playedCard]);
      removePlayerCard(playerIndex, card);
      onSelectCard(playerIndex, playedCard);
    },
    [discardedPile, drawCards, rounds]
  );

  const handleDrawCards = useCallback(
    playerIndex => {
      console.log('handleDrawCards - draw cards');
      drawCards(playerIndex, 1);
    },
    [drawCards]
  );

  const performBotAction = async () => {
    console.log('performBotAction - start');

    const lastPlayedCard = discardedPile[discardedPile.length - 1];
    console.log('performBotAction - lastPlayedCard', lastPlayedCard);

    const playableCard = findPlayableCard(lastPlayedCard, players[0].cards);

    if (playableCard?.special) [playableCard.color] = shuffle(colors);

    console.log('performBotAction - playableCard', playableCard);

    // ? Delay bot actions so the player can see actions being taken
    await delay();

    if (playableCard) handleSelectCard(0, playableCard);
    else handleDrawCards(0);
  };

  const handleBotCallUno = () => {
    if (botDelayTimerId.current) clearTimeout(botDelayTimerId.current);

    botDelayTimerId.current = setTimeout(() => {
      callUno(0);
    }, Math.ceil(Math.random() * 4 * 1000));
  };

  // ? Pile selfheal (when going less than 5 remaining cards, reshuffle the discarded pile into it)
  useEffect(() => {
    if (!mounted.current) return;

    if (pile.length <= 5) pileSelfHeal();
  }, [pile, pileSelfHeal]);

  // ? Set player name if player context changes
  useEffect(() => {
    if (mounted.current) return;

    setPlayers(old => {
      const copy = [...old];
      copy[1].name = player.name;

      return [...copy];
    });
  }, [player]);

  useEffect(() => {
    if (!gameStarted.current) return;

    console.log('round changed (useEff) - currentPlayer', currentPlayer);

    if (unoedPlayers.length) {
      handleBotCallUno(unoedPlayers);
    }

    if (currentPlayer === 0) {
      console.log('bot should perform his actions :D');
      performBotAction();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rounds]);

  // ? Start game
  useEffect(() => {
    if (gameStarted.current) return;

    start();
  }, [start]);

  useEffect(() => {
    if (!mounted.current) return;

    if (winner) {
      changeGame(old => ({ ...old, winner }));
      history.push('postgame');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  useEffect(() => {
    if (mounted.current) return;

    mounted.current = true;
  }, []);

  return (
    <>
      <Board
        currentPlayer={currentPlayer}
        pile={pile}
        discardedPile={discardedPile}
        players={players}
        unoedPlayers={unoedPlayers}
        onDrawCards={() => handleDrawCards(1)}
        onCallUno={() => callUno(1)}
        onSetCardColor={handleSetCardColor}
        onCardClick={card => handleSelectCard(1, card)}
      />
    </>
  );
};

export default Game;
