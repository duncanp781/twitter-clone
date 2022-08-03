import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../App";
import BackHeader from "../Components/BackHeader";
import Loading from "../Components/Loading";
import NewTweet from "../Components/NewTweet";
import SingleTweet from "../Components/SingleTweet";
import { FeedStyled } from "../Components/Styled/Feed.styled";
import { Page } from "../Components/Styled/Page.styled";
import Tweet from "../Components/Tweet";
import TweetDisplay from "../Components/TweetDisplay";
import {
  createResponse,
  getNResponses,
  getTweetFromID,
  likeResponse,
  unlikeResponse,
} from "../Utility/FirebaseFunctions";
import { TweetInfo } from "./Feed";

function SingleTweetPage() {
  let params = useParams();
  const user = useContext(UserContext);
  const [currentTweet, setCurrentTweet] = useState<TweetInfo | null>(null);
  const [latestResponse, setLatestResponse] = useState<TweetInfo[]>([]);

  useEffect(() => {
    if (!currentTweet) {
      getTweetFromID(params.tweetId as string).then((tweet) => {
        if (tweet) {
          setCurrentTweet(tweet);
        }
      });
    }
  }, [params.tweetId, currentTweet]);

  return (
    <Page>
      <BackHeader>
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Tweet</span>
      </BackHeader>
      {!!currentTweet ? (
        <>
          <FeedStyled>
            <SingleTweet tweetInfo={currentTweet} />
            <NewTweet
              submit={(responseContent) => {
                createResponse(user, currentTweet, responseContent).then(
                  (response) => {
                    setLatestResponse([response]);
                  }
                );
              }}
              placeholder="Write your response"
            />
            <TweetDisplay
              getMethod={() => getNResponses(currentTweet, 10)}
              ready={!!currentTweet}
              extraTweets={latestResponse}
              likeMethod = {likeResponse}
              unlikeMethod = {unlikeResponse}
            />
          </FeedStyled>
        </>
      ) : <Loading/>}
    </Page>
  );
}

export default SingleTweetPage;
