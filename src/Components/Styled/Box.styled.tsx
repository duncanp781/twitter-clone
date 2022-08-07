import React from 'react';
import styled from 'styled-components';
import { lightTheme } from './Themes';

type Props  = {
  hoverable? : boolean,
}

export const Box = styled.div<Props>`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background-color 0.3s;
  &:hover{
    background-color: ${(props) => props.hoverable ? lightTheme.extralight : 'white' }; 
  }
`

export const TweetStyled = styled.article<Props>`
overflow-wrap: break-word;
overflow: hidden;
width: 100%;
background-color: white;
padding: 16px;
display: grid;
grid-template-columns: max-content 1fr;
gap: 8px;
transition: background-color 0.3s;
&:hover{
  background-color: ${(props) => props.hoverable ? lightTheme.extralight: 'white' };
}
`
