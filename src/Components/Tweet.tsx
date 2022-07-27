import React from 'react'
import {Box} from './Styled/Box.styled'

type Props = {
  userName: string,
  userAt: string,
  tweetContent: string,
}

function Tweet({userName, userAt, tweetContent}: Props) {
  return (
    <Box>
      <div>@{userAt} {userName}</div>
      <div>{tweetContent}</div>
    </Box>
  )
}

export default Tweet