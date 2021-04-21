import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

export const Content = styled.div`
  ${({ color, loading }) => css`
    width: 100px;
    height: 150px;

    svg {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    ${loading &&
    css`
      background-size: 100px 100px;
      background-image: linear-gradient(
        to right,
        #f6f7f8 0%,
        #edeef1 20%,
        #f6f7f8 40%,
        #f6f7f8 100%
      );
      animation: placeholderShimmer 5s linear infinite forwards;
      @keyframes placeholderShimmer {
        0% {
          background-position: -40rem 0;
        }
        100% {
          background-position: 40rem 0;
        }
      }
    `}

    ${!!color &&
    color !== 'default' &&
    css`
      svg.background {
        fill: ${color};
      }
    `}
  `}
`;
