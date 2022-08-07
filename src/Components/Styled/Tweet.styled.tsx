import styled from "styled-components";
import { lightTheme } from "./Themes";

type Props = {
  large?: boolean;
  hoverable?: boolean;
};

export const UserName = styled.span<Props>`
height: fit-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: ${(props) => (props.large ? "1.5rem" : "1rem")};
  &:hover {
    text-decoration: ${(props) => (props.hoverable ? "underline" : "none")};
    cursor: ${(props) => (props.hoverable ? "pointer" : "auto")};
  }
`;

export const TweetHead = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  gap: 8px;
`;
export const TweetField = styled.textarea`
  min-height: 4rem;
  height: 100%;
  width: 100%;
  resize: none;
  padding: 4px;
  border: none;
`;

export const ProPicContainer = styled.div<Props>`
  background-color: white;
  height: ${(props) => (props.large ? "6rem" : "2.5rem")};
  min-width: ${(props) => (props.large ? "6rem" : "2.5rem")};
  max-width: ${(props) => (props.large ? "6rem" : "2.5rem")};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
`;

export const ProPic = styled.img<Props>`
  max-height: ${(props) => (props.large ? "6rem" : "2.5rem")};
  max-width: ${(props) => (props.large ? "6rem" : "2.5rem")};
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  min-height: 2rem;
  gap: 16px;
`;
export const TweetIcon = styled.img`
  height: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

export const TweetInfoContainer = styled.div`
  display: flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  gap: 4px;
  padding: 2px;
  height: 41px;
  width: 41px;
  border-radius: 100%;
  transition: background-color 0.5s, color 0.5s;
  &:hover {
    background-color: ${lightTheme.light};
    color: ${lightTheme.font};
    cursor: pointer;
  }
`

export {};
