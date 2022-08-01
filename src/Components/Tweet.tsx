import React, { useContext, useState } from "react";
import { TweetInfo } from "../Pages/Feed";
import { Box, TweetStyled } from "./Styled/Box.styled";
import {
  UserName,
  TweetHead,
  ProPic,
  BottomRow,
  TweetIcon,
} from "./Styled/Tweet.styled";
import Trash from "../img/trash.svg";
import { deleteTweetFromDB, likeTweet, unlikeTweet } from "../Utility/FirebaseFunctions";
import BlankProfile from "../img/blank-profile.webp";
import Heart from "../img/heart.svg";
import FilledHeart from "../img/heart_filled.svg";
import { useNavigate } from "react-router";
import { SubtitleText } from "./Styled/Text.styled";
import { UserContext } from "../App";

type Props = {
  tweetInfo: TweetInfo;
  removeTweetFromFeed: (arg0: string) => void;
};

function Tweet({ tweetInfo, removeTweetFromFeed }: Props) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [liked, setLiked] = useState(tweetInfo.likes.includes(user.uId));
  const [localLikes, setLocalLikes] = useState(tweetInfo.likes.length);

  const remove = () => {
    deleteTweetFromDB(tweetInfo.id);
    removeTweetFromFeed(tweetInfo.id);
  };

  return (
    <TweetStyled hoverable>
      <div>
        <ProPic src={BlankProfile} alt={"profile"} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TweetHead>
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
        <div>{tweetInfo.tweetContent}</div>
        <BottomRow>
          {liked ? (
            <TweetIcon src={FilledHeart} alt="liked tweet" onClick = {async () => {
              setLiked(false);
              setLocalLikes(localLikes - 1);
              await unlikeTweet(user, tweetInfo);
            }}
              />
          ) : (
            <TweetIcon src={Heart} alt="like tweet" onClick = {async () => {
              setLiked(true);
              setLocalLikes(localLikes + 1);
              await likeTweet(user, tweetInfo);
            }}/>
          )} <span>{localLikes}</span>
          {user.uId === tweetInfo.user.uId && (
            <TweetIcon src={Trash} alt="Delete Tweet" onClick={remove} />
          )}
        </BottomRow>
      </div>
    </TweetStyled>
  );
}

export default Tweet;
