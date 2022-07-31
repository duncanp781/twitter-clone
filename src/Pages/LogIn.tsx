import React, { useContext, useState } from "react";
import { TwoCol, ColSide, Subtitle } from "../Components/Styled/Login.styled";
import { Button } from "../Components/Styled/Button.styled";
import { Logo } from "../Components/Styled/Header.styled";
import { useNavigate } from "react-router-dom";
import twitterLogoScreen from "../img/twitter-cyber-logo.webp";
import TextInput from "../Components/TextInput";
import { TriggerUserUpdate, UserContext } from "../App";
import {
  addUserToDB,
  signInUser,
} from "../Utility/FirebaseFunctions";

export default function LogIn() {
  const user = useContext(UserContext);
  const triggerUpdate = useContext(TriggerUserUpdate);
  const [showAddInfo, setShowAddInfo] = useState(false);
  const navigate = useNavigate();

  const promptSignUp = async () => {
    try {
      const isNewUser = await signInUser();
      if (!isNewUser && user.userName !== 'unknown') {
        navigate("/feed");
        console.log("user exists, navigating to feed");
      } else {
        console.log("user doesnt exist, showing new user form");
        setShowAddInfo(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TwoCol>
      <ColSide>
        <Logo>Twitter Clone</Logo>
        <img
          src={twitterLogoScreen}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          alt="Twitter logo"
        />
      </ColSide>
      <ColSide>
        <Subtitle>See What's Happening</Subtitle>
        {showAddInfo ? (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const userNameInput = form.elements.namedItem(
                "userName"
              ) as HTMLInputElement;
              const userAtInput = form.elements.namedItem(
                "userAt"
              ) as HTMLInputElement;
              addUserToDB({
                uId: user.uId,
                userName: userNameInput.value,
                userAt: userAtInput.value,
              });
              form.reset();
              triggerUpdate();
              navigate('/feed');
            }}
          >
            <TextInput id="userName" text="Enter your username:" />
            <TextInput id="userAt" text="Enter your at:" />
            <Button>Submit</Button>
          </form>
        ) : (
          <>
            <Button onClick={promptSignUp}>Sign in with google</Button>
            <Button onClick={() => navigate("/feed")}>Continue as Guest</Button>
          </>
        )}
      </ColSide>
    </TwoCol>
  );
}
