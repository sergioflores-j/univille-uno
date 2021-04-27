import React from 'react';
import { useHistory } from 'react-router-dom';

import logo from 'assets/logo.svg';
import { usePlayer } from 'context/player';
import * as S from './styles';

const Header = () => {
  const history = useHistory();
  const player = usePlayer();

  return (
    <S.Wrapper>
      <S.Logo src={logo} onClick={() => history?.push('/')} />
      <S.Heading>Univille Uno</S.Heading>
      <S.Content>{player?.name && <>Hello {player.name}</>}</S.Content>
    </S.Wrapper>
  );
};

export default Header;
