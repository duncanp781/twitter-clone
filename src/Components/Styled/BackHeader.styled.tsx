import styled from "styled-components";
import { lightTheme } from "./Themes";

export const BackHeaderStyled = styled.header`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 16px;
  padding: 4px 16px;
  position: sticky;
  top: 0;
  background-color: rgb(255, 255, 255, 0.95);
`;

export const BackIcon = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  border-radius: 100%;
  padding: 4px;
  &:hover {
    background-color: ${lightTheme.secondary};
  }
`;

export const BackMenu = styled.button`
  background: none;
  border: none;
  display: none;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  border-radius: 100%;
  padding: 4px;
  margin-left: auto;
  &:hover {
    background-color: ${lightTheme.secondary};
  }
  @media (max-width: 799px) {
    display: flex;
  }
`;
