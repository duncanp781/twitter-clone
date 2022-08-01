import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../App";
import { Button } from "../Components/Styled/Button.styled";
import {
  HeaderStyled,
  Logo,
  SidebarButton,
  SidebarContainer,
  UserInfoStyled,
} from "../Components/Styled/Header.styled";
import { SubtitleText } from "../Components/Styled/Text.styled";
import {
  ProPic,
  ProPicContainer,
  UserName,
} from "../Components/Styled/Tweet.styled";
import ProfileIcon from "../img/profile.svg";
import HomeIcon from "../img/home.svg";
import Modal from "../Components/Modal";
import NewTweet from "../Components/NewTweet";
import { createTweet } from "../Utility/FirebaseFunctions";

type Props = {
  signOut: () => void;
  hasUser: boolean;
};

function Header({ signOut, hasUser }: Props) {
  const navigate = useNavigate();
  const [showTweetModal, setShowTweetModal] = useState(false);
  const user = useContext(UserContext);
  return (
    <>
      {showTweetModal && (
        <Modal close={() => setShowTweetModal(false)}>
          <NewTweet
            submit={async (tweetContent: string) => {
              let newTweet = await createTweet(user, tweetContent);
            }}
          />
        </Modal>
      )}
      <HeaderStyled>
        <Logo
          onClick={() => {
            navigate("/feed");
          }}
        >
          Twitter
        </Logo>
        <SidebarContainer>
          <SidebarButton onClick={() => navigate("/feed")}>
            <img src={HomeIcon} alt="home" style={{ height: "2rem" }} />
            Home
          </SidebarButton>
        </SidebarContainer>
        <SidebarContainer>
          <SidebarButton onClick={() => navigate("/user/" + user.uId)}>
            <img src={ProfileIcon} alt="profile" style={{ height: "2rem" }} />
            Profile
          </SidebarButton>
        </SidebarContainer>
        <SidebarContainer>
          <Button
            style={{ width: "85%" }}
            onClick={() => setShowTweetModal(true)}
          >
            Tweet
          </Button>
        </SidebarContainer>
        <SidebarContainer hoverable>
          <ProPicContainer>
            <ProPic src={user.info.img} alt="Profile" />
          </ProPicContainer>
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
        </SidebarContainer>
      </HeaderStyled>
    </>
  );
}

export default Header;
