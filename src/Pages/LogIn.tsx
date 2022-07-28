import React, { useState } from "react";
import { TwoCol, ColSide, Subtitle } from "../Components/Styled/Login.styled";
import { Button } from "../Components/Styled/Button.styled";
import { Logo } from "../Components/Styled/Header.styled";
import { useNavigate } from "react-router-dom";

type Props = {
  signInUser: () => Promise<boolean | null>;
};

export default function LogIn({ signInUser }: Props) {
  const [showAddInfo, setShowAddInfo] = useState(false);
  const navigate = useNavigate();

  const promptSignUp = async () => {
    const res = await signInUser();
    if (res === false) {
      navigate('/feed');
    } else if (res === true) {
      setShowAddInfo(true);
    }
  };

  return (
    <TwoCol>
      <ColSide>
        <Logo>Twitter Clone</Logo>
      </ColSide>
      <ColSide>
        <Subtitle>See What's Happening</Subtitle>
        <Button onClick={promptSignUp}>Sign in with google</Button>
        <Button onClick = {() => navigate('/feed')}>Continue as Guest</Button>
      </ColSide>
    </TwoCol>
  );
}
