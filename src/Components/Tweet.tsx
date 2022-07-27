import React from 'react'
import { TweetInfo } from '../Pages/Feed'
import {Box} from './Styled/Box.styled'

type Props = {
  tweetInfo: TweetInfo
}

function Tweet({tweetInfo}: Props) {
  return (
    <Box>
      <div>@{tweetInfo.userAt} {tweetInfo.userName}</div>
      <div>{tweetInfo.tweetContent}</div>
    </Box>
  )
}

export default Tweet