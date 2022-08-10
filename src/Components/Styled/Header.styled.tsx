import styled, { keyframes } from "styled-components";
import { lightTheme } from "./Themes";

type Props = {
  hoverable?: boolean;
};

export const HeaderStyled = styled.nav`
  position: sticky;
  top: 0;
  align-self: flex-start;
  height: 100vh;
  max-width: 20%;
  min-width: 300px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-left: 2px solid ${lightTheme.secondary};
  @media (max-width: 799px) {
    display: none;
  }
`;

export const BurgerStyled = styled.nav`
background-color: white;
  position: relative;
  top: 0;
  right: calc(-100% + 300px);
  height: 100vh;
  max-width: 20%;
  min-width: 300px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-left: 2px solid ${lightTheme.secondary};
`;

export const logoJump = keyframes`
  25%{
    transform: rotate(-15deg);
  }

  75%{
    transform: rotate(20deg);
  }

`;

export const Logo = styled.span`
  font-weight: bold;
  font-size: 1.6rem;

  &:hover {
    cursor: pointer;
    animation-name: ${logoJump};
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
  }
`;

export const SidebarContainer = styled.div<Props>`
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: background-color 0.4s;
  border-radius: 32px;
  &:hover {
    ${(props) =>
      props.hoverable ? `background-color: ${lightTheme.secondary}` : ""};
    cursor: pointer;
  }
`;

export const SidebarButton = styled.button`
  width: 85%;
  padding: 12px 12px;
  border-radius: 20px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.4s;
  &:hover {
    background-color: ${lightTheme.secondary};
    cursor: pointer;
  }
`;

export const UserInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 4px;
`;

export {};
