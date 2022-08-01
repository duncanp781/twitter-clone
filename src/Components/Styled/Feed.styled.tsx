import styled from 'styled-components';
import { lightTheme } from './Themes';

export const FeedStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: ${lightTheme.secondary}; 
  padding: 2px;
  border-radius: 2px;
  margin: 8px;
`