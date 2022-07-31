import React, { useEffect, useState } from "react";
import { TweetInfo } from "../Pages/Feed";
import Tweet from "./Tweet";
import uniqid from "uniqid";

type Props = {
  getMethod: () => Promise<TweetInfo[]>;
  extraTweets?: TweetInfo[];
  ready: boolean;
};

export default function TweetDisplay({ getMethod, extraTweets, ready }: Props) {
  const [toDisplay, setToDisplay] = useState<TweetInfo[]>(
    extraTweets ? extraTweets : []
  );
  const [triedLoad, setTriedLoad] = useState(false);

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
      setToDisplay((prevDisplayed) => {return [...extraTweets, ...prevDisplayed]})
    }
  }, [extraTweets]);

  const removeTweetFromFeed = (id: string) => {
    setToDisplay(toDisplay.filter((tweet) => tweet.id !== id));
  };

  return (
    <>
      {toDisplay.map((tweet) => {
        return (
          <Tweet
            tweetInfo={tweet}
            removeTweetFromFeed={removeTweetFromFeed}
            key={uniqid()}
            update={(tweet) => {}}
          />
        );
      })}
    </>
  );
}
