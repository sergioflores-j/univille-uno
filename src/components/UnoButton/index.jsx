import React from 'react';

import * as S from './styles';

const UnoButton = ({ onClick }) => (
  <S.Wrapper>
    <S.Button onClick={onClick}>UNO!</S.Button>
  </S.Wrapper>
);

export default UnoButton;
