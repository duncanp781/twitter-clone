import styled from "styled-components";
import { lightTheme } from "./Themes";

export const ProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; 
`;

export const ProfileHeader = styled.div`
  background-color: ${lightTheme.splash};
  min-height: 20%;
  padding: 36px;

`;
