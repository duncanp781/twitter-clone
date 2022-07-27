import React, {useState} from "react";
import { Box } from "./Styled/Box.styled";
import { Button } from "./Styled/Button.styled";

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
          form.reset();
        }}
      >
        <textarea
          style={{
            minHeight: "6rem",
            height: "100%",
            width: "100%",
            resize: "none",
          }}

          onChange = {(e) => {
            setTweetLength(e.target.value.length);
          }}
          maxLength={250}
          name="tweet_content"
        ></textarea>
        <Button disabled = {tweetLength === 0 || tweetLength > 250}>Tweet</Button>
      </form>
    </Box>
  );
}
