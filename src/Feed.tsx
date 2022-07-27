import React, { useContext, useEffect, useState } from 'react';
import Tweet from './Components/Tweet';
import { Page } from './Components/Styled/Page.styled';
import { Button } from './Components/Styled/Button.styled';
import { addDoc, collection, serverTimestamp, query, orderBy, limit, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import NewTweet from './Components/NewTweet';
import { DBContext, UserContext } from './App';


//Get the most recent number tweets
const getNTweets = async (db: any, number: number): Promise<DocumentData[]> => {
  let out: DocumentData[] = []
  const tweetsRef = collection(db, 'tweets');
  const tweetsQuery = query(tweetsRef, orderBy('time'), limit(number));
  const tweetsSnapshot = await getDocs(tweetsQuery);
  tweetsSnapshot.forEach((doc) => {out.push(doc.data());
  console.log(doc)});
  return out;
}

function Feed() {
  const user = useContext(UserContext);
  const db = useContext(DBContext);
  const [tweetsToDisplay, setTweetsToDisplay] = useState<DocumentData[]>([]);




  //Send a tweet to the database
  const createTweet = (tweetContent: string) => {
    addDoc(collection(db, 'tweets'), {
      ...user,
      tweetContent: tweetContent,
      time: serverTimestamp(),
    })
  }

  //If there are no tweets, load the 10 most recent tweets
  useEffect(() => {
    async function initTweets(){
      console.log('initializing tweets...')
      let out = await getNTweets(db, 10);
      setTweetsToDisplay(out);
    }
    (tweetsToDisplay.length === 0) && initTweets();
  }, [db, tweetsToDisplay])

  return (
    <Page>
      <NewTweet submit={(tweetContent) => { console.log(tweetContent); 
        createTweet(tweetContent);
        }} />
      {tweetsToDisplay.map(tweet => {
        return (<Tweet userName = {tweet.userName} userAt = {tweet.userAt} tweetContent = {tweet.tweetContent}/>)

      })}
    </Page>
  );
}

export default Feed;
