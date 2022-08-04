import styled from 'styled-components';
import { lightTheme } from './Themes';

type Props = {
  large? : boolean,
  hoverable?: boolean,
}

export const UserName = styled.span<Props>`
overflow-x: hidden;
white-space: nowrap;
text-overflow:ellipsis;
width: 100%;
  font-weight: bold;
  font-size: ${props => props.large? '1.5rem' : '1rem'};
  &:hover{
    text-decoration: ${props => props.hoverable? 'underline' : 'none'};
    cursor: ${props => props.hoverable? 'pointer' : 'auto'};;
  }

`


export const TweetHead = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  text-align: right;
  gap: 8px;

`
export const TweetField = styled.textarea`
min-height: 4rem;
height: 100%;
width: 100%;
resize: none;
padding: 4px;
border: none;
`

export const ProPicContainer = styled.div<Props>`
background-color: white;
height: ${props => props.large ? '6rem' : '2.5rem'};
min-width: ${props => props.large ? '6rem' : '2.5rem'};
max-width: ${props => props.large ? '6rem' : '2.5rem'};
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
border-radius: 100%;

`

export const ProPic = styled.img<Props>`
  max-height: ${props => props.large ? '6rem' : '2.5rem'};
  max-width: ${props => props.large ? '6rem' : '2.5rem'};
`

export const BottomRow = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  min-height: 2rem;
  gap: 16px
`
export const TweetIcon = styled.img`
  height: 1.5rem;
  &:hover{
    cursor: pointer;
  }
`

export {}