import React from 'react';
import Tweet from './Components/Tweet';
import { Page } from './Components/Styled/Page.styled';
import { Button } from './Components/Styled/Button.styled';
import NewTweet from './Components/NewTweet';


function Feed() {
  return (
    <Page>
      <NewTweet submit = {(e) => {console.log(e);}}/>
      <Tweet userName = {'Duncan'} userAt = {'drambulus'} tweetText = {'This is the first ever tweet!'}/>
    </Page>
  );
}

export default Feed;
