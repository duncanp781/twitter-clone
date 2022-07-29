import React, { useState } from "react";
import { Box } from "./Styled/Box.styled";
import { Button } from "./Styled/Button.styled";
import { TweetField } from "./Styled/Tweet.styled";

type Props = {
  submit: (text: string) => any;
};

export default function NewTweet({ submit }: Props) {
  const [tweetLength, setTweetLength] = useState(0);

  return (
    <Box>
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

        style = {{display: 'flex', flexDirection: 'column', alignItems: 'right',}}
      >
        <TweetField
          onChange={(e) => {
            setTweetLength(e.target.value.length);
          }}
          maxLength={250}
          name="tweet_content"
        ></TweetField>
        <Button disabled={tweetLength === 0 || tweetLength > 250}>Tweet</Button>
      </form>
    </Box>
  );
}
