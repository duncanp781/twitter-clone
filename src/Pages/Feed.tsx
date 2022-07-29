import React, { useContext, useEffect, useState } from "react";
import Tweet from "../Components/Tweet";
import { Page } from "../Components/Styled/Page.styled";
import uniqid from "uniqid";
import NewTweet from "../Components/NewTweet";
import { User, UserContext } from "../App";
import { createTweet, getNTweets } from "../Utility/FirebaseFunctions";
import { FeedStyled } from "../Components/Styled/Feed.styled";
import TweetDisplay from "../Components/TweetDisplay";

export type TweetInfo = {
  user: User;
  tweetContent: string;
  time: string;
  id: string;
};

function Feed() {
  const user = useContext(UserContext);
  const [tweetsToDisplay, setTweetsToDisplay] = useState<TweetInfo[]>([]);

  //If there are no tweets, load the 10 most recent tweets
  useEffect(() => {
    async function initTweets() {
      let out = await getNTweets(10);
      setTweetsToDisplay(out);
    }
    tweetsToDisplay.length === 0 && initTweets();
  }, [tweetsToDisplay]);

  const removeTweetFromFeed = (id: string) => {
    setTweetsToDisplay(tweetsToDisplay.filter((tweet) => tweet.id !== id));
  };

  return (
    <Page>
      <FeedStyled>
        <NewTweet
          submit={async (tweetContent: string) => {
            let newTweet = await createTweet(user, tweetContent);
            setTweetsToDisplay([newTweet, ...tweetsToDisplay]);
          }}
        />
        <TweetDisplay toDisplay = {tweetsToDisplay} remove = {removeTweetFromFeed}/>
      </FeedStyled>
    </Page>
  );
}

export default Feed;
