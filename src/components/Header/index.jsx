import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import logo from 'assets/logo.svg';
import * as S from './styles';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (location.pathname === '/game') {
      setIsCollapsed(true);
    }
    if (location.pathname === '/postgame') {
      setIsCollapsed(false);
    }
  }, [location]);

  return (
    <>
      <S.Wrapper>
        <S.Content isCollapsed={isCollapsed}>
          {!isCollapsed && (
            <S.Logo src={logo} onClick={() => history?.push('/')} />
          )}
          <S.Heading>Univille Uno</S.Heading>
        </S.Content>
        <S.HideToggle
          isCollapsed={isCollapsed}
          onClick={() => setIsCollapsed(old => !old)}
        />
      </S.Wrapper>
    </>
  );
};

export default Header;
