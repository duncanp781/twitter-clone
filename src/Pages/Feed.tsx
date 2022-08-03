import React, { useContext, useEffect, useState } from "react";
import Tweet from "../Components/Tweet";
import { Page } from "../Components/Styled/Page.styled";
import uniqid from "uniqid";
import NewTweet from "../Components/NewTweet";
import { ExtraTweetContext, User, UserContext } from "../App";
import {
  createTweet,
  getNTweets,
  getNUserTweets,
} from "../Utility/FirebaseFunctions";
import { FeedStyled } from "../Components/Styled/Feed.styled";
import TweetDisplay from "../Components/TweetDisplay";
import { BackHeaderStyled } from "../Components/Styled/BackHeader.styled";

export type TweetInfo = {
  user: User;
  tweetContent: string;
  time: string;
  id: string;
  likes: string[];
  responses: string[];
};


function Feed() {
  const user = useContext(UserContext);
  const extraTweet = useContext(ExtraTweetContext);
  const [tweetsToDisplay, setTweetsToDisplay] = useState<TweetInfo[]>(extraTweet);
  useEffect(() => {
    setTweetsToDisplay(extraTweet)
  }, [extraTweet]);

  return (
    <Page>
      <BackHeaderStyled>
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Home</span>
      </BackHeaderStyled>
      <FeedStyled>
        <NewTweet
          submit={async (tweetContent: string) => {
            let newTweet = await createTweet(user, tweetContent);
            setTweetsToDisplay([newTweet]);
          }}
        />
        <TweetDisplay
          getMethod={() => {
            return getNTweets(10);
          }}
          extraTweets={tweetsToDisplay}
          ready={true}
        />
      </FeedStyled>
    </Page>
  );
}

export default Feed;
