import styled from 'styled-components';

export const UserName = styled.span`
  font-weight: bold;
`

export const UserAt = styled.span`
  color: gray;
`

export const Date = styled.span`
color: gray;`

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
`


export {}