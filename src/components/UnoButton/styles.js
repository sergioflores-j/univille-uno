import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  `}
`;

export const Button = styled.button`
  ${() => css`
    border: 1px solid red;
    outline: none;
    width: 100%;
    max-width: 220px;
    height: 100px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 28px;
    color: red;
    background-color: #eeeeee;
  `}
`;
