import styled from "styled-components";

export const Container = styled.div`
  margin: 20px;
`;

export const Img = styled.img`
  display: inline-block;
  margin: 20px;
  transition: opacity 0.3s;
  background: white;
  transform: ${({ rotate }) => rotate && `rotate(${rotate}deg) scaleX(-1)`};
`;
