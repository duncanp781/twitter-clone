import React from 'react'
import { Box } from './Styled/Box.styled'
import { Button } from './Styled/Button.styled';

type Props = {
  submit: (text: string) => any,
}

export default function NewTweet({ submit }: Props) {
  return (
    <Box>
      <form onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const text = formData.get('tweet_content') as string;
        submit(text);
        form.reset();
      }}
      >
        <textarea cols={45} rows={5} name='tweet_content'>
        </textarea>
        <Button>Tweet</Button>
      </form>
    </Box>
  )
}
