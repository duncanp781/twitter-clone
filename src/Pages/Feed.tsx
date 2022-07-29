import React, { useContext, useEffect, useState } from "react";
import Tweet from "../Components/Tweet";
import { Page } from "../Components/Styled/Page.styled";
import uniqid from "uniqid";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import NewTweet from "../Components/NewTweet";
import { UserContext } from "../App";
import { format } from "date-fns";
import { createTweet, getNTweets } from "../Utility/FirebaseFunctions";

export type TweetInfo = {
  userName: string;
  userAt: string;
  tweetContent: string;
  time: string;
};

//Get the most recent number tweets

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

  return (
    <Page>
      <NewTweet
        submit={(tweetContent: string) => {
          let newTweet = createTweet(user, tweetContent);
          setTweetsToDisplay([newTweet, ...tweetsToDisplay]);
        }}
      />
      {tweetsToDisplay.map((tweet) => {
        return <Tweet tweetInfo={tweet} key={uniqid()} />;
      })}
    </Page>
  );
}

export default Feed;
