import {
  BackHeaderStyled,
  BackIcon,
  BackMenu,
} from "./Styled/BackHeader.styled";
import Back from "../img/back.svg";
import { useNavigate } from "react-router";
import { TweetIcon } from "./Styled/Tweet.styled";
import MenuIcon from "../img/menu.svg";
import { useContext, useEffect, useState } from "react";
import { BurgerStyled } from "./Styled/Header.styled";
import BurgerMenu from "../Pages/BurgerMenu";
import {setShowHamContext } from "../App";

type Props = {
  showBack?: boolean;
  children: JSX.Element;
};

function BackHeader({ showBack = true, children }: Props) {
  const navigate = useNavigate();
  const setShowHam = useContext(setShowHamContext);

  return (
    <>
      <BackHeaderStyled>
        {showBack && (
          <BackIcon
            onClick={() => {
              navigate(-1);
            }}
          >
            <TweetIcon style={{ height: "1.4rem" }} src={Back} alt="Go Back" />
          </BackIcon>
        )}
        {children}
        <BackMenu onClick={() => setShowHam(true)}>
          <TweetIcon style={{ height: "1.4rem" }} src={MenuIcon} alt="Menu" />
        </BackMenu>
      </BackHeaderStyled>
    </>
  );
}

export default BackHeader;
