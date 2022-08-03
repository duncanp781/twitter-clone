import React from 'react'
import styled from 'styled-components';
import LoadingIcon from '../img/loading.gif';


const LoadScreen = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  flex: 1 1 auto;
`

export default function Loading() {
  return (
    <LoadScreen>
      <div style = {{padding: '2rem'}}><img style = {{height: '2rem',}}src = {LoadingIcon} alt = 'Loading' /></div>
    </LoadScreen>
  )
}