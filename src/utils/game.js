export const isPlayableCard = (lastPlayedCard, card) => {
  if (
    card.special ||
    lastPlayedCard.color === card.color ||
    lastPlayedCard.card === card.card
  )
    return true;

  return false;
};

export const getCardRanking = (lastPlayedCard, cards, card) => {
  let ranking = 0;

  if (!isPlayableCard(lastPlayedCard, card)) return ranking;

  if (lastPlayedCard.color === card.color) ranking += 1;
  if (lastPlayedCard.card === card.card) ranking += 1;

  const cardsByColor = new Map();
  const cardsByCardNumber = new Map();

  cards.forEach(c => {
    cardsByColor.set(c.color, [...(cardsByColor.get(c.color) || []), c]);
    cardsByCardNumber.set(c.card, [
      ...(cardsByCardNumber.get(c.card) || []),
      c,
    ]);
  });

  if (
    cardsByColor.get(card.color)?.length &&
    !Array.from(cardsByColor.values()).find(
      val => val.length > cardsByColor.get(card.color)?.length
    )
  )
    ranking += 1;

  if (
    cardsByCardNumber.get(card.card)?.length &&
    !Array.from(cardsByCardNumber.values()).find(
      val => val.length > cardsByColor.get(card.card)?.length
    )
  )
    ranking += 1;

  return ranking;
};

export const findPlayableCard = (lastPlayedCard, cards) =>
  [...cards].reduce((acc, c) => {
    const ranking = getCardRanking(lastPlayedCard, cards, c);

    if (ranking === 0) return acc;

    if (ranking > (acc?.ranking || 0)) {
      return { ...c, ranking };
    }

    return acc;
  }, null);

export const delay = (timeout = 1000) =>
  new Promise(resolve => setTimeout(resolve, timeout));
