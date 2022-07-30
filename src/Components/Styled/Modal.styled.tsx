import styled from 'styled-components';
import { lightTheme } from './Themes';


export const ModalScreenStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100%;
  width: 100vw;
  background-color: rgb(0,0,0,0.213);
`

export const ModalContainerStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  padding: 24px;
  background-color: ${lightTheme.main};
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 30%;
  min-height: 30%;
  border-radius: 4px;
`