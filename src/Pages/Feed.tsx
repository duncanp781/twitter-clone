import React, { useContext, useEffect, useState } from "react";
import Tweet from "../Components/Tweet";
import { Page } from "../Components/Styled/Page.styled";
import uniqid from "uniqid";
import NewTweet from "../Components/NewTweet";
import { User, UserContext } from "../App";
import { createTweet, getNTweets, getNUserTweets } from "../Utility/FirebaseFunctions";
import { FeedStyled } from "../Components/Styled/Feed.styled";
import TweetDisplay from "../Components/TweetDisplay";

export type TweetInfo = {
  user: User;
  tweetContent: string;
  time: string;
  id: string;
  likes: string[]
};

function Feed() {
  const user = useContext(UserContext);
  const [tweetsToDisplay, setTweetsToDisplay] = useState<TweetInfo[]>([]);

  return (
    <Page>
      <FeedStyled>
        <NewTweet
          submit={async (tweetContent: string) => {
            let newTweet = await createTweet(user, tweetContent);
            setTweetsToDisplay([newTweet, ...tweetsToDisplay]);
          }}
        />
        <TweetDisplay
          getMethod = {() => {
            return getNTweets(10)}}
          extraTweets = {tweetsToDisplay}
          ready = {true}
        />
      </FeedStyled>
    </Page>
  );
}

export default Feed;
