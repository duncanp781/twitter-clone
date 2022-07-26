import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { setShowHamContext, TriggerUserUpdate, UserContext } from "../App";
import { Button } from "../Components/Styled/Button.styled";
import CloseIcon from "../img/close.svg";
import {
  BurgerStyled,
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
  TweetIcon,
  UserName,
} from "../Components/Styled/Tweet.styled";
import ProfileIcon from "../img/profile.svg";
import HomeIcon from "../img/home.svg";
import TwitterLogo from "../img/Twitter-logo.svg";
import Modal from "../Components/Modal";
import NewTweet from "../Components/NewTweet";
import { createTweet } from "../Utility/FirebaseFunctions";
import { TweetInfo } from "./Feed";
import { ModalScreenStyled } from "../Components/Styled/Modal.styled";

type Props = {
  signOut: () => void;
  hasUser: boolean;
  setExtraTweet: any;
};

function BurgerMenu({ signOut, hasUser, setExtraTweet }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTweetModal, setShowTweetModal] = useState(false);
  const user = useContext(UserContext);
  const update = useContext(TriggerUserUpdate);
  const setShowHam = useContext(setShowHamContext);

  return (
    <>
      {showTweetModal && (
        <Modal  close={() => setShowTweetModal(false)}>
          <NewTweet 
            submit={async (tweetContent: string) => {
              let newTweet = await createTweet(user, tweetContent);
              if (location.pathname === "/feed") {
                setExtraTweet([newTweet]);
              } else {
                navigate("/feed");
              }
              setShowTweetModal(false);
            }}
          />
        </Modal>
      )}
      <ModalScreenStyled style = {{zIndex: '1'}}>
        <BurgerStyled>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <div style={{ alignSelf: 'flex-end'}}>
              <TweetIcon
                src={CloseIcon}
                alt="close"
                onClick={() => setShowHam(false)}
                style={{ height: "1.8rem" }}
              />
            </div>
            <Logo
              style={{ padding: "12px" }}
              onClick={() => {
                navigate("/feed");
              }}
            >
              <img
                src={TwitterLogo}
                alt="Twitter Logo"
                style={{ width: "32px" }}
              />
            </Logo>
            <SidebarContainer>
              <SidebarButton onClick={() => navigate("/feed")}>
                <img src={HomeIcon} alt="home" style={{ height: "2rem" }} />
                Home
              </SidebarButton>
            </SidebarContainer>
            <SidebarContainer>
              <SidebarButton onClick={() => navigate("/user/" + user.uId)}>
                <img
                  src={ProfileIcon}
                  alt="profile"
                  style={{ height: "2rem" }}
                />
                Profile
              </SidebarButton>
            </SidebarContainer>
            <SidebarContainer style={{ width: "100%" }}>
              <Button
                style={{ width: "85%" }}
                onClick={() => setShowTweetModal(true)}
              >
                Tweet
              </Button>
            </SidebarContainer>
          </div>
          <div style={{ maxWidth: "100%" }}>
            <SidebarContainer
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  navigate("/user/" + user.uId);
                }
              }}
              hoverable
              style={{ padding: "4px" }}
            >
              <ProPicContainer
                onClick={() => {
                  navigate("/user/" + user.uId);
                }}
                style={{ flex: "none" }}
              >
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
                <SubtitleText
                  onClick={() => {
                    navigate("/user/" + user.uId);
                  }}
                >
                  @{user.userAt}
                </SubtitleText>
              </UserInfoStyled>
              {hasUser ? (
                <Button style={{ padding: "12px" }} onClick={signOut}>
                  Sign out
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ padding: "12px" }}
                >
                  Sign in
                </Button>
              )}
            </SidebarContainer>
          </div>
        </BurgerStyled>
      </ModalScreenStyled>
    </>
  );
}

export default BurgerMenu;
