import React from 'react'
import { TweetInfo } from '../Pages/Feed'
import {Box} from './Styled/Box.styled'
import {UserName, UserAt, Date, TweetHead} from './Styled/Tweet.styled'



type Props = {
  tweetInfo: TweetInfo
}

function Tweet({tweetInfo}: Props) {
  return (
    <Box>
      <TweetHead>
        <UserName>{tweetInfo.userName}</UserName>
        <UserAt>@{tweetInfo.userAt}</UserAt>
        <Date>{tweetInfo.time}</Date>
      </TweetHead>
      <div>{tweetInfo.tweetContent}</div>
    </Box>
  )
}

export default Tweet