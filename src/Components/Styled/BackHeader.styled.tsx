import styled from 'styled-components';
import { lightTheme } from './Themes';

export const BackHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 16px;
  padding: 4px 16px;
`


export const BackIcon = styled.div`
display: flex;
align-items: center;
justify-content: center;
border-radius: 100%;
  padding: 4px;
&:hover{
  background-color: ${lightTheme.secondary};
  
}
`