import React, { useEffect, useRef, useState } from 'react';

import * as S from './styles';

function useDynamicSVGImport(card) {
  const ImportedIconRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadIcon = async () => {
      setLoading(true);

      // ? svg inline loading - CRA BUG: https://github.com/facebook/create-react-app/issues/5276#issuecomment-665628393
      const cardContent = await import(
        `!!@svgr/webpack?-svgo,+titleProp,+ref!assets/cards/${card}.svg`
      )
        .catch(() =>
          import('!!@svgr/webpack?-svgo,+titleProp,+ref!assets/cards/back.svg')
        )
        .then(res => res.default);

      ImportedIconRef.current = cardContent;
      setLoading(false);
    };

    loadIcon();
  }, [card]);

  return { loading, SvgIcon: ImportedIconRef.current };
}

const Card = ({
  card,
  color = 'default',
  clickable = false,
  playable = true,
  onClick,
}) => {
  const { SvgIcon, loading } = useDynamicSVGImport(card);

  return (
    <S.Wrapper>
      <S.Content
        color={color}
        $loading={loading}
        $clickable={clickable}
        $playable={playable}
      >
        {!loading && !!SvgIcon && (
          <SvgIcon onClick={clickable ? onClick : () => {}} />
        )}
      </S.Content>
    </S.Wrapper>
  );
};

export default Card;
