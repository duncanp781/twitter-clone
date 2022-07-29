import React from 'react'
import { TweetInfo } from '../Pages/Feed'
import Tweet from './Tweet';
import uniqid from 'uniqid';

type Props = {
  toDisplay: TweetInfo[],
  remove: (arg0: string) => void,
}

export default function TweetDisplay({toDisplay, remove}: Props) {
  return (
    <>{toDisplay.map((tweet) => {
      return (
        <Tweet
          tweetInfo={tweet}
          removeTweetFromFeed={remove}
          key={uniqid()}
        />
      );
    })}</>
  )
}