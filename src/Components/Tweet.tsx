import React from "react";
import { TweetInfo } from "../Pages/Feed";
import { Box, TweetStyled } from "./Styled/Box.styled";
import {
  UserName,
  TweetHead,
  ProPic,
} from "./Styled/Tweet.styled";
import Trash from "../img/trash.svg";
import { deleteTweetFromDB } from "../Utility/FirebaseFunctions";
import BlankProfile from "../img/blank-profile.webp";
import { useNavigate } from "react-router";
import { SubtitleText } from "./Styled/Text.styled";

type Props = {
  tweetInfo: TweetInfo;
  removeTweetFromFeed: (arg0: string) => void;
};

function Tweet({ tweetInfo, removeTweetFromFeed }: Props) {
  const navigate = useNavigate();

  const remove = () => {
    deleteTweetFromDB(tweetInfo.id);
    removeTweetFromFeed(tweetInfo.id);
  };
  return (
    <TweetStyled>
      <div>
        <ProPic src={BlankProfile} alt={"profile"} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TweetHead>
          <UserName
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
        <div
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <img
            style={{ height: "2rem" }}
            src={Trash}
            alt="Delete Tweet"
            onClick={remove}
          />
        </div>
      </div>
    </TweetStyled>
  );
}

export default Tweet;
