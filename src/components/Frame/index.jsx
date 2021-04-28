import React from 'react';

import Header from '../Header';

import * as S from './styles';

const Frame = ({ isDark = false, children }) => (
  <S.Wrapper isDark={isDark}>
    <Header />
    {children}
  </S.Wrapper>
);

export default Frame;
