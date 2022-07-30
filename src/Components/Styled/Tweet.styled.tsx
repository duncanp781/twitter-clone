import styled from 'styled-components';

type Props = {
  large? : boolean,
  hoverable?: boolean,
}

export const UserName = styled.span<Props>`
  font-weight: bold;
  font-size: ${props => props.large? '1.5rem' : '1rem'};
  &:hover{
    text-decoration: ${props => props.hoverable? 'underline' : 'none'};
    cursor: ${props => props.hoverable? 'pointer' : 'auto'};;
  }

`


export const TweetHead = styled.div`
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  text-align: right;
  gap: 8px;

`
export const TweetField = styled.textarea`
min-height: 6rem;
height: 100%;
width: 100%;
resize: none;
padding: 4px;
`



export const ProPic = styled.img<Props>`
  height: ${props => props.large ? '6rem' : '2.5rem'};
  border-radius: 100%;
`


export {}