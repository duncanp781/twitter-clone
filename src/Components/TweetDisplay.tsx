import React, { useEffect, useState } from 'react'
import { TweetInfo } from '../Pages/Feed'
import Tweet from './Tweet';
import uniqid from 'uniqid';

type Props = {
  toDisplay: TweetInfo[],
  remove: (arg0: string) => void,
}

export default function TweetDisplay({toDisplay, remove}: Props) { 

  return (
    <div>{toDisplay.map((tweet) => {
      return (
        <div key={tweet.id}>
        <Tweet
          tweetInfo={tweet}
          removeTweetFromFeed={remove}
          
        /></div>
      );
    })}</div>
  )
}