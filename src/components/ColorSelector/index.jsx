import React from 'react';

import * as S from './styles';

const ColorSelector = ({ onChange }) => (
  <S.ColorSelector>
    Select Color:
    <label htmlFor="select-blue">
      <S.ColorSelectorSquare color="blue" />
      Blue{' '}
      <input
        id="select-blue"
        type="radio"
        name="color"
        value="blue"
        onClick={() => onChange('blue')}
      />
    </label>
    <label htmlFor="select-red">
      <S.ColorSelectorSquare color="red" />
      Red{' '}
      <input
        id="select-red"
        type="radio"
        name="color"
        value="red"
        onClick={() => onChange('red')}
      />
    </label>
    <label htmlFor="select-yellow">
      <S.ColorSelectorSquare color="yellow" />
      Yellow{' '}
      <input
        id="select-yellow"
        type="radio"
        name="color"
        value="yellow"
        onClick={() => onChange('yellow')}
      />
    </label>
    <label htmlFor="select-green">
      <S.ColorSelectorSquare color="green" />
      Green{' '}
      <input
        id="select-green"
        type="radio"
        name="color"
        value="green"
        onClick={() => onChange('green')}
      />
    </label>
  </S.ColorSelector>
);

export default ColorSelector;
