import styled from 'styled-components';
import React from 'react'

export const Button = styled.button`
padding: 12px 24px;
border-radius: 20px;
border-style: none;
&:active::not(disabled){
  background-color: gray;
}
`