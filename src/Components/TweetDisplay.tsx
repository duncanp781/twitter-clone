import React, { useContext, useEffect, useState } from "react";
import { User, UserContext } from "../App";
import { TweetInfo } from "../Pages/Feed";
import { likeTweet, unlikeTweet } from "../Utility/FirebaseFunctions";
import Loading from "./Loading";
import { Button } from "./Styled/Button.styled";
import Tweet from "./Tweet";

type Props = {
  getMethod: () => Promise<TweetInfo[]>;
  extraTweets?: TweetInfo[];
  ready: boolean;
  likeMethod?: (arg0: User, arg1: TweetInfo) => Promise<void>;
  unlikeMethod?: (arg0: User, arg1: TweetInfo) => Promise<void>;
};

export default function TweetDisplay({
  getMethod,
  extraTweets,
  ready,
  likeMethod = likeTweet,
  unlikeMethod = unlikeTweet,
}: Props) {
  const [toDisplay, setToDisplay] = useState<TweetInfo[]>(
    extraTweets ? extraTweets : []
  );
  const [triedLoad, setTriedLoad] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    async function initTweets() {
      let out = await getMethod();

      setToDisplay([...toDisplay, ...out]);
      setTriedLoad(true);
    }

    ready && !triedLoad && toDisplay.length === 0 && initTweets();
  }, [ready, triedLoad, toDisplay, getMethod]);

  useEffect(() => {
    if (extraTweets !== undefined) {
      setToDisplay((prevDisplayed) => {
        return [...extraTweets, ...prevDisplayed];
      });
    }
  }, [extraTweets]);

  const removeTweetFromFeed = (id: string) => {
    setToDisplay(toDisplay.filter((tweet) => tweet.id !== id));
  };

  const unlikeLocal = (tweet: TweetInfo) => {
    setToDisplay(prevDisplay => {
      for (let oldTweet of prevDisplay){
        if (oldTweet.id === tweet.id ){
          oldTweet.likes = tweet.likes.filter((like: string) => like !== user.uId);
        }
      }
      return prevDisplay;
    })
    
  };

  return (
    <>
      {triedLoad ? (
        toDisplay.map((tweet) => {
          return (
            triedLoad && (
              <Tweet
                tweetInfo={tweet}
                removeTweetFromFeed={removeTweetFromFeed}
                key={tweet.id}
                likeMethod={likeMethod}
                unlikeMethod={unlikeMethod}
                unlikeLocal = {unlikeLocal}
              />
            )
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
}
