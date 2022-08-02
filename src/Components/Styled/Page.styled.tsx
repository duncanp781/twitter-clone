import styled from 'styled-components';
import React from 'react'
import { lightTheme } from './Themes';


export const Page = styled.div`
width: 100%;
max-width: 40vw;
min-width: 500px;
height: 100%;
padding: 16px 0;
border-right: 2px solid ${lightTheme.secondary};
border-left: 2px solid ${lightTheme.secondary};
`

