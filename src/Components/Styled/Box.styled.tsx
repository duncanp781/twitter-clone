import React from 'react';
import styled from 'styled-components';
import { lightTheme } from './Themes';

type Props  = {
  hoverable? : boolean,
}

export const Box = styled.div<Props>`
  background-color: ${lightTheme.main};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:hover{
    background-color: ${(props) => props.hoverable ? lightTheme.secondary : lightTheme.main }; 
  }
`

export const TweetStyled = styled.div<Props>`
background-color: ${lightTheme.main};
padding: 16px;
display: grid;
grid-template-columns: max-content 1fr;
gap: 8px;
&:hover{
  background-color: ${(props) => props.hoverable ? lightTheme.secondary : lightTheme.main };
}
`
