import styled from 'styled-components';
import React from 'react'
import { lightTheme } from './Themes';

type Props = {
  cancel?: boolean,
  wide?: boolean,
}

export const Button = styled.button<Props>`
font-weight: bold;
margin: 4px;
padding: 12px 24px;
border-radius: 20px;
border: ${props => props.cancel ? `2px solid ${lightTheme.splash}` : 'none'};
background-color: ${props => props.cancel? 'transparent' : lightTheme.splash};
color: ${props => props.cancel? lightTheme.splash : lightTheme.main};
&:hover:enabled{
  cursor: pointer;
  background-color: #1B99D9;
}
&:disabled{
  background-color: #55CCFF;
}
`