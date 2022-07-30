import styled from 'styled-components';
import React from 'react'
import { lightTheme } from './Themes';

type Props = {
  cancel?: boolean,
}

export const Button = styled.button<Props>`
padding: 12px 24px;
border-radius: 20px;
border: ${props => props.cancel ? `2px solid ${lightTheme.splash}` : 'none'};
background-color: ${props => props.cancel? 'transparent' : lightTheme.splash};
color: ${props => props.cancel? lightTheme.splash : lightTheme.main};
&:active::not(disabled){
  background-color: gray;
}
`