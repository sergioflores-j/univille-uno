import React from 'react';
import { useHistory } from 'react-router-dom';

import logo from 'assets/logo.svg';
import * as S from './styles';

const Header = () => {
  const history = useHistory();

  return (
    <S.Wrapper>
      <S.Logo src={logo} onClick={() => history?.push('/')} />
    </S.Wrapper>
  );
};

export default Header;
