import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { Box, TweetStyled } from "./Styled/Box.styled";
import { Button } from "./Styled/Button.styled";
import { ProPic, ProPicContainer, TweetField } from "./Styled/Tweet.styled";

type Props = {
  submit: (text: string) => any;
  placeholder?: string
};

export default function NewTweet({ submit, placeholder = "What's on your mind?" }: Props) {
  const [tweetLength, setTweetLength] = useState(0);
  const user = useContext(UserContext);

  return (
    <TweetStyled>
      <ProPicContainer>
        <ProPic src = {user.info.img} alt = 'Profile'/>
      </ProPicContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const text = formData.get("tweet_content") as string;
          submit(text);
          setTweetLength(0);
          form.reset();
        }}

        style = {{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px',}}
      >
        <TweetField
          onChange={(e) => {
            setTweetLength(e.target.value.length);
          }}
          maxLength={250}
          name="tweet_content"
          placeholder = {placeholder}
        ></TweetField>
        <Button style = {{width: 'fit-content', }}disabled={tweetLength === 0 || tweetLength > 250}>Tweet</Button>
      </form>
    </TweetStyled>
  );
}
