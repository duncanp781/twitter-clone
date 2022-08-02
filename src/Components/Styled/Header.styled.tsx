import styled from "styled-components";
import { lightTheme } from "./Themes";

type Props = {
  hoverable?: boolean,
}

export const HeaderStyled = styled.div`
  height: 100vh;
  max-width: 20%;
  min-width: 300px;
  position: sticky;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-left: 2px solid ${lightTheme.secondary};
`;
export const Logo = styled.span`
  font-weight: bold;
  font-size: 1.6rem;
  &:hover {
    cursor: pointer;
  }
`;

export const SidebarContainer = styled.div<Props>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 32px;
  &:hover {
    ${props => props.hoverable? `background-color: ${lightTheme.secondary}` : '' };
    cursor: pointer;
  }
`;

export const SidebarButton = styled.button`
  width: 85%;
  padding: 12px 24px;
  border-radius: 20px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover {
    background-color: ${lightTheme.secondary};
    cursor: pointer;
  }
`

export const UserInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export {};
