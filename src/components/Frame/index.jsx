import React from 'react';

import Header from '../Header';

import * as S from './styles';

const Frame = ({ children }) => (
  <S.Wrapper>
    <Header />
    {children}
  </S.Wrapper>
);

export default Frame;
