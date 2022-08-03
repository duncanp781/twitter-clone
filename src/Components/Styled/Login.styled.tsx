import styled from "styled-components";

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100vh;
`;

export const ColSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Subtitle = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
`;
