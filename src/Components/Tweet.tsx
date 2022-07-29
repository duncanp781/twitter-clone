import React from 'react'
import { TweetInfo } from '../Pages/Feed'
import {Box} from './Styled/Box.styled'
import {UserName, UserAt, Date, TweetHead} from './Styled/Tweet.styled'
import Trash from '../img/trash.svg';
import { deleteTweetFromDB } from '../Utility/FirebaseFunctions';


type Props = {
  tweetInfo: TweetInfo
  removeTweetFromFeed: (arg0: string) => void,
}

function Tweet({tweetInfo, removeTweetFromFeed}: Props) {

  const remove = () => {
    deleteTweetFromDB(tweetInfo.id);
    removeTweetFromFeed(tweetInfo.id);
  }
  return (
    <Box>
      <TweetHead>
        <UserName>{tweetInfo.user.userName}</UserName>
        <UserAt>@{tweetInfo.user.userAt}</UserAt>
        <Date>{tweetInfo.time}</Date>
      </TweetHead>
      <div>{tweetInfo.tweetContent}</div>
      <div><img src = {Trash} alt = 'Delete Tweet' onClick = {remove}/></div>
    </Box>
  )
}

export default Tweet