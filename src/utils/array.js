/**
 * This is an implementation of Durstenfeld shuffle: http://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm
 * It picks a random element for each original array element,
 * and excludes it from the next draw, like picking randomly from a deck of cards.
 * @param {any[]} array
 * @returns {any[]} the sorted array
 */
export function shuffle(array) {
  const newArr = [...array];

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
}
