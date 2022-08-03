import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { TriggerUserUpdate, UserContext } from "../App";
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
import TwitterLogo from '../img/Twitter-logo.svg';
import Modal from "../Components/Modal";
import NewTweet from "../Components/NewTweet";
import { createTweet } from "../Utility/FirebaseFunctions";
import { TweetInfo } from "./Feed";

type Props = {
  signOut: () => void;
  hasUser: boolean;
  setExtraTweet: any
};

function Header({ signOut, hasUser, setExtraTweet }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTweetModal, setShowTweetModal] = useState(false);
  const user = useContext(UserContext);
  const update = useContext(TriggerUserUpdate);
  return (
    <>
      {showTweetModal && (
        <Modal close={() => setShowTweetModal(false)}>
          <NewTweet
            submit={async (tweetContent: string) => {
              let newTweet = await createTweet(user, tweetContent);
              if (location.pathname === '/feed'){
                setExtraTweet([newTweet]);
              }else{
                navigate('/feed');
              }
              setShowTweetModal(false);
            }}
          />
        </Modal>
      )}
      <HeaderStyled>
        <div style= {{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%',}}>
          <Logo style = {{padding: '12px'}}
            onClick={() => {
              navigate("/feed");
            }}
          >
            <img src = {TwitterLogo} alt = 'Twitter Logo' style={{ width: "32px" }}/>
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
          <SidebarContainer style = {{width: '100%',}}>
            <Button
              style={{ width: "85%" }}
              onClick={() => setShowTweetModal(true)}
            >
              Tweet
            </Button>
          </SidebarContainer>
        </div>
        <div >
          
          <SidebarContainer hoverable style = {{padding: '4px'}}>
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
              <Button style = {{padding: '12px'}} onClick={signOut}>Sign out</Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/");
                }}
                style = {{padding: '12px'}}
              >
                Sign in
              </Button>
            )}
          </SidebarContainer>
        </div>
      </HeaderStyled>
    </>
  );
}

export default Header;
