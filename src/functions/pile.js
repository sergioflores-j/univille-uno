import { wildCards, colors, cards, forbiddenStartCards } from 'constants/index';
import { shuffle } from 'utils/array';
import uniqueId, { resetAllCounters } from 'utils/uniqueId';

export const shufflePile = pile => {
  const newPile = shuffle(pile);

  while (forbiddenStartCards.includes(newPile[0].card)) {
    const removedVal = newPile.splice(0, 1);
    newPile.push(removedVal);
  }

  return newPile;
};

// You'll find 25 of each color (red, green, blue, and yellow),
// Each color consists of one zero, two each of 1 through 9, and two each of "Skip," "Draw Two," and "Reverse."
// eight Wild cards inside the 108-card deck.
export const generateCardsPile = () => {
  resetAllCounters();

  const coloredCardsPile = cards.reduce((acc, card) => {
    colors.forEach(color => {
      if (card === '0') {
        acc.push({ id: uniqueId(), card, color });
        return;
      }

      for (let i = 0; i < 2; ++i) {
        acc.push({ id: uniqueId(), card, color });
      }
    });

    return acc;
  }, []);

  const wildCardsPile = wildCards.reduce((acc, card) => {
    for (let i = 0; i < 4; ++i) {
      acc.push({ id: uniqueId(), card, color: 'special', special: true });
    }

    return acc;
  }, []);

  return shufflePile([...coloredCardsPile, ...wildCardsPile]);
};

export const resetCards = pile =>
  pile.map(card => {
    const newCard = { ...card, playedBy: undefined, round: undefined };
    if (card.special) newCard.color = 'special';

    return card;
  });
