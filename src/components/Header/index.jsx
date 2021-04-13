import React from 'react';

import logo from 'assets/UNO_Logo.svg';
import * as S from './styles';

const Header = () => (
  <S.Wrapper>
    <S.Logo src={logo} />
  </S.Wrapper>
);

export default Header;
