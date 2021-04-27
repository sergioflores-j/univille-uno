import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    min-height: 50vh;
    border: 1px solid black;
  `}
`;

export const Content = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      padding: 25px;
    }
  `}
`;

export const Input = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  label {
    width: 100%;
  }
  input {
    padding: 15px;
  }
`;
