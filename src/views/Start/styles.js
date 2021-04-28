import styled, { css } from 'styled-components';

import startIcon from 'assets/start.svg';

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    min-height: 50vh;
  `}
`;

export const Content = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: end;

    button {
      padding: 45px;
      margin-top: auto;
      background-color: transparent;
      border: none;
      font-weight: bold;
      background-image: url(${startIcon});
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      border-radius: 50%;

      &:hover {
        box-shadow: 8px 5px 20px 0px #585555;
        cursor: pointer;
      }
    }
  `}
`;

export const Input = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 15px;

  label {
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    line-height: 1.5;
  }
  input {
    padding: 25px;
    font-size: 20px;
    line-height: 1.5;
    width: 100%;
  }
`;
