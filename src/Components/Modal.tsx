import React from "react";
import { ModalContainerStyled, ModalScreenStyled } from "./Styled/Modal.styled";
import CloseIcon from "../img/close.svg";
import { TweetIcon } from "./Styled/Tweet.styled";

type Props = {
  children: JSX.Element;
  close: () => void;
};

export default function Modal({ children, close }: Props) {
  return (
    <ModalScreenStyled
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <ModalContainerStyled>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <TweetIcon src={CloseIcon} alt="close" onClick={close} style = {{height: '1.8rem',}}/>
        </div>
        {children}
      </ModalContainerStyled>
    </ModalScreenStyled>
  );
}
