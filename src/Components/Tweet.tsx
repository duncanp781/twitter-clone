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
import { UserContext } from "../App";
import { lightTheme } from "./Styled/Themes";

type Props = {
  tweetInfo: TweetInfo;
  removeTweetFromFeed: (arg0: string) => void;
};

function Tweet({ tweetInfo, removeTweetFromFeed }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(UserContext);
  const [liked, setLiked] = useState(tweetInfo.likes.includes(user.uId));
  const [localLikes, setLocalLikes] = useState(tweetInfo.likes.length);
  const [proPic, setProPic] = useState(BlankProfile);
  const [triedLoad, setTriedLoad] = useState(false);
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
          navigate("/tweet/" + tweetInfo.id);
        }
      }}
    >
      <ProPicContainer>
        <ProPic src={proPic} alt={"profile"} />
      </ProPicContainer>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TweetHead
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              navigate("/tweet/" + tweetInfo.id);
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
              navigate("/tweet/" + tweetInfo.id);
            }
          }}
        >
          {tweetInfo.tweetContent}
        </div>
        <BottomRow
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              navigate("/tweet/" + tweetInfo.id);
            }
          }}
        >
          {location.pathname === '/feed' ? 
            <div style = {{display: 'flex', alignItems: 'center', color: '#6b7280', gap: '4px',}}>
              <TweetIcon src = {Comment} alt = 'View Replies' onClick = {() => navigate('/tweet/' + tweetInfo.id)}/>
              <span>{tweetInfo.responses.length}</span>
            </div> : null}
            <div style = {{display: 'flex', alignItems: 'center', color: '#6b7280', gap: '4px',}}>
          {liked ? (
            <TweetIcon
              src={FilledHeart}
              alt="liked tweet"
              onClick={async () => {
                setLiked(false);
                setLocalLikes(localLikes - 1);
                await unlikeTweet(user, tweetInfo);
              }}
            />
          ) : (
            <TweetIcon
              src={Heart}
              alt="like tweet"
              onClick={async () => {
                setLiked(true);
                setLocalLikes(localLikes + 1);
                await likeTweet(user, tweetInfo);
              }}
            />
          )}
          <span>{localLikes}</span>
          </div>
          {user.uId === tweetInfo.user.uId && (
            <TweetIcon src={Trash} alt="Delete Tweet" onClick={remove} />
          )}
        </BottomRow>
      </div>
    </TweetStyled>
  );
}

export default Tweet;
