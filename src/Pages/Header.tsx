import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../App";
import { Button } from "../Components/Styled/Button.styled";
import {
  HeaderStyled,
  Logo,
  UserInfoStyled,
} from "../Components/Styled/Header.styled";
import { SubtitleText } from "../Components/Styled/Text.styled";
import { ProPic, UserName } from "../Components/Styled/Tweet.styled";
import BlankProfile from "../img/blank-profile.webp";

type Props = {
  signOut: () => void;
  hasUser: boolean;
};

function Header({ signOut, hasUser }: Props) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  return (
    <HeaderStyled>
      <Logo
        onClick={() => {
          navigate("/feed");
        }}
      >
        Twitter
      </Logo>
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <ProPic src={BlankProfile} alt="Profile" />
        <UserInfoStyled>
          <UserName
            hoverable
            onClick={() => {
              navigate("/user/" + user.uId);
            }}
          >
            {user.userName}
          </UserName>
          <SubtitleText>@{user.userAt}</SubtitleText>
        </UserInfoStyled>
        {hasUser ? (
          <Button onClick={signOut}>Sign out</Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Sign in
          </Button>
        )}
      </div>
    </HeaderStyled>
  );
}

export default Header;
