import React from 'react'
import {Box} from './Styled/Box.styled'

type Props = {
  userName: string,
  userAt: string,
  tweetText: string,
}

function Tweet({userName, userAt, tweetText}: Props) {
  return (
    <Box>
      <div>@{userAt} {userName}</div>
      <div>{tweetText}</div>
    </Box>
  )
}

export default Tweet