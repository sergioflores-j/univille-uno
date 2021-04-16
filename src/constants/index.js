export const specialCards = ['jump', 'invert', 'draw2'];
export const cards = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ...specialCards,
];
export const colors = ['blue', 'green', 'red', 'yellow'];
export const wildCards = ['draw4', 'change_color'];
export const forbiddenStartCards = [...wildCards, ...specialCards];
