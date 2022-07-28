import React, { useContext, useEffect, useState } from 'react';
import Tweet from '../Components/Tweet';
import { Page } from '../Components/Styled/Page.styled';
import uniqid from 'uniqid';
import { addDoc, collection, serverTimestamp, query, orderBy, limit, getDocs,  } from 'firebase/firestore';
import NewTweet from '../Components/NewTweet';
import { DBContext, UserContext } from '../App';
import {format} from 'date-fns';

export type TweetInfo = {
  userName: string,
  userAt: string,
  tweetContent: string,
  time: string,
}

//Get the most recent number tweets
const getNTweets = async (db: any, number: number): Promise<TweetInfo[]> => {
  let out: TweetInfo[] = []
  const tweetsRef = collection(db, 'tweets');
  const tweetsQuery = query(tweetsRef, orderBy('time', 'desc'), limit(number));
  const tweetsSnapshot = await getDocs(tweetsQuery);
  tweetsSnapshot.forEach((doc) => {
    out.push(
      {
        ...doc.data(),
        time: format(doc.data().time.toDate(), 'MM/dd/yyyy')
      } as TweetInfo
    );
  });
  return out;
}

function Feed() {
  const user = useContext(UserContext);
  const db = useContext(DBContext);
  const [tweetsToDisplay, setTweetsToDisplay] = useState<TweetInfo[]>([]);




  //Send a tweet to the database
  const createTweet = (tweetContent: string): TweetInfo => {
    let newTweet = {
      ...user,
      tweetContent: tweetContent,
      time: serverTimestamp(),
    };
    addDoc(collection(db, 'tweets'), newTweet);
    return {...newTweet, time: "Just Now"};
  }

  //If there are no tweets, load the 10 most recent tweets
  useEffect(() => {
    async function initTweets() {
      let out = await getNTweets(db, 10);
      setTweetsToDisplay(out);
    }
    (tweetsToDisplay.length === 0) && initTweets();
  }, [db, tweetsToDisplay])

  return (
    <Page>
      <NewTweet submit={(tweetContent: string) => {
        let newTweet = createTweet(tweetContent);
        setTweetsToDisplay([ newTweet, ...tweetsToDisplay]);
      }} />
      {tweetsToDisplay.map(tweet => {
        return (<Tweet tweetInfo = {tweet} key = {uniqid()}/>)

      })}
    </Page>
  );
}

export default Feed;
