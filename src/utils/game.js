export const isPlayableCard = (lastPlayedCard, card) => {
  if (
    card.special ||
    lastPlayedCard.color === card.color ||
    lastPlayedCard.card === card.card
  )
    return true;

  return false;
};

// TODO: find the best available card? (most with same color/number?)
export const findPlayableCard = (lastPlayedCard, cards) =>
  cards.find(c => isPlayableCard(lastPlayedCard, c));

export const delay = (timeout = 1000) =>
  new Promise(resolve => setTimeout(resolve, timeout));
