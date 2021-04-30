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

// ? Special lists
export const forbiddenStartCards = [...wildCards, ...specialCards];
export const shouldSkipRoundPass = [...specialCards, 'draw4'];
export const drawableCards = ['draw2', 'draw4'];

export const cardColorMap = {
  blue: '#132779',
  green: '#0c9807',
  red: '#c50000',
  yellow: '#f3cf3d',
  special: '',
};
