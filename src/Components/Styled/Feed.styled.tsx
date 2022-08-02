import styled from 'styled-components';
import { lightTheme } from './Themes';

export const FeedStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: ${lightTheme.secondary}; 
  border-radius: 2px;
`