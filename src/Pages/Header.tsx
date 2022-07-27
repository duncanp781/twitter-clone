import React, { useContext } from "react";
import { UserContext } from "../App";
import { Button } from "../Components/Styled/Button.styled";
import { HeaderStyled, Logo, UserInfoStyled } from "../Components/Styled/Header.styled";
import { UserAt, UserName } from "../Components/Styled/Tweet.styled";

type Props = {
  signIn: () => void;
  signOut: () => void;
  hasUser: boolean;
};

function Header({ signIn, signOut, hasUser }: Props) {
  const user = useContext(UserContext)
  return (
    <HeaderStyled>
      <Logo>Twitter</Logo>
      <div style = {{
        display: 'flex',
        gap: '8px',
      }}>
        <UserInfoStyled>
          <UserName>{user.userName}</UserName>
          <UserAt>@{user.userAt}</UserAt>
        </UserInfoStyled>
        {hasUser ? (
          <Button onClick={signOut}>Sign out</Button>
        ) : (
          <Button onClick={signIn}>Sign in with google</Button>
        )}
      </div>
    </HeaderStyled>
  );
}

export default Header;
