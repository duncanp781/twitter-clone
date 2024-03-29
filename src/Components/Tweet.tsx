import React, { useContext, useEffect, useState } from "react";
import { TweetInfo } from "../Pages/Feed";
import { Box, TweetStyled } from "./Styled/Box.styled";
import {
  UserName,
  TweetHead,
  ProPic,
  BottomRow,
  TweetIcon,
  ProPicContainer,
  TweetInfoContainer,
} from "./Styled/Tweet.styled";
import Trash from "../img/trash.svg";
import {
  deleteTweetFromDB,
  getUserProPic,
  likeTweet,
  unlikeTweet,
} from "../Utility/FirebaseFunctions";
import BlankProfile from "../img/blank-profile.webp";
import Heart from "../img/heart.svg";
import FilledHeart from "../img/heart_filled.svg";
import Comment from '../img/comment.svg';
import { useLocation, useNavigate } from "react-router";
import { SubtitleText } from "./Styled/Text.styled";
import { User, UserContext } from "../App";
import { lightTheme } from "./Styled/Themes";

type Props = {
  tweetInfo: TweetInfo;
  removeTweetFromFeed: (arg0: string) => void;
  likeMethod: (arg0: User, arg1: TweetInfo) => Promise<void>;
  unlikeMethod: (arg0: User, arg1: TweetInfo) => Promise<void>;
  unlikeLocal: (arg0: TweetInfo) => void
};

function Tweet({ tweetInfo, removeTweetFromFeed, likeMethod, unlikeMethod, unlikeLocal}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(UserContext);
  const [liked, setLiked] = useState(tweetInfo.likes.includes(user.uId));
  const [localLikes, setLocalLikes] = useState(tweetInfo.likes.length);
  const [proPic, setProPic] = useState(BlankProfile);
  const [triedLoad, setTriedLoad] = useState(false);

  const goToTweetPage = () => {
    if(!location.pathname.includes('/tweet')){
      navigate('/tweet/' + tweetInfo.id);
    }
  }
  useEffect(() => {
    if (!triedLoad) {
      getUserProPic(tweetInfo.user).then((url) => {
        setProPic(url);
        setTriedLoad(true);
      });
    }
  }, [tweetInfo.user, triedLoad]);

  const remove = () => {
    deleteTweetFromDB(tweetInfo.id);
    removeTweetFromFeed(tweetInfo.id);
  };

  return (
    <TweetStyled
      hoverable
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          goToTweetPage();
        }
      }}
    >
      <ProPicContainer>
        <ProPic src={proPic} alt={"profile"} />
      </ProPicContainer>
      <div style={{ display: "flex", flexDirection: "column", overflowWrap: 'break-word', maxWidth: '100%', overflow: 'hidden', height: 'fit-content',}}>
        <TweetHead
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              goToTweetPage();
            }
          }}
        >
          <UserName
            hoverable
            onClick={() => {
              navigate("/user/" + tweetInfo.user.uId);
            }}
          >
            {tweetInfo.user.userName}
          </UserName>
          <SubtitleText>@{tweetInfo.user.userAt}</SubtitleText>
          <SubtitleText>{tweetInfo.time}</SubtitleText>
        </TweetHead>
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              goToTweetPage();
            }
          }}
        >
          {tweetInfo.tweetContent}
        </div>
        <BottomRow
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              goToTweetPage();
            }
          }}
        >
          {location.pathname === '/feed' || location.pathname.includes('/user') ? 
            <TweetInfoContainer>
              <TweetIcon src = {Comment} alt = 'View Replies' onClick = {goToTweetPage}/>
              <span>{tweetInfo.responses.length}</span>
              </TweetInfoContainer> : null}
            <TweetInfoContainer>
          {liked ? (
            <TweetIcon
              src={FilledHeart}
              alt="liked tweet"
              onClick={async () => {
                setLiked(false);
                unlikeLocal(tweetInfo);
                setLocalLikes(localLikes - 1);
                await unlikeMethod(user, tweetInfo);
              }}
            />
          ) : (
            <TweetIcon
              src={Heart}
              alt="like tweet"
              onClick={async () => {
                setLiked(true);
                setLocalLikes(localLikes + 1);
                await likeMethod(user, tweetInfo);
              }}
            />
          )}
          <span>{localLikes}</span>
          </TweetInfoContainer>
          {(user.uId === tweetInfo.user.uId || user.info.admin) && (
            <TweetInfoContainer>
              <TweetIcon src={Trash} alt="Delete Tweet" onClick={remove} />
            </TweetInfoContainer>
          )}
        </BottomRow>
      </div>
    </TweetStyled>
  );
}

export default Tweet;
