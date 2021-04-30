/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

import { useGame } from 'context/game';

import * as S from './styles';

const gifs = ['minions', 'leonardo', 'office'];

const PostGame = () => {
  const { winner } = useGame();
  const [gifIndex, setGifIndex] = useState(Math.floor(Math.random() * 3));

  useEffect(() => {
    const interval = setInterval(() => {
      setGifIndex(old => {
        if (gifs[old + 1]) return old + 1;
        return 0;
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <S.Wrapper>
      And the winner is:
      <S.Highlight>{winner?.name}</S.Highlight>
      <img
        src={
          // eslint-disable-next-line import/no-dynamic-require, global-require
          require(`assets/animations/${gifs[gifIndex]}.gif`).default
        }
        alt="Congrats gif"
      />
    </S.Wrapper>
  );
};

export default PostGame;
