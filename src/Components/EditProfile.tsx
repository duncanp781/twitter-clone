import React, { useContext } from "react";
import { TriggerUserUpdate, UserContext } from "../App";
import { addUserToDB } from "../Utility/FirebaseFunctions";
import Modal from "./Modal";
import { Button } from "./Styled/Button.styled";
import { TweetField } from "./Styled/Tweet.styled";
import TextInput from "./TextInput";

type Props = {
  close: () => void;
  update: () => void;
};

export default function EditProfile({ close, update }: Props) {
  const user = useContext(UserContext);
  const triggerUpdate = useContext(TriggerUserUpdate);
  return (
    <Modal close={close}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
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
          const userBioInput = form.elements.namedItem(
            "userBio"
          ) as HTMLInputElement;
          const editedUser = {
            ...user,
            userName: userNameInput.value,
            userAt: userAtInput.value,
            info: {
              ...user.info,
              bio: userBioInput.value,
            }
          }
          addUserToDB(editedUser);
          triggerUpdate();
          update();
          close();
        }}
      >
        <TextInput
          id="userName"
          text="Enter your username:"
          defaultVal={user.userName}
        />
        <TextInput id="userAt" text="Enter your at:" defaultVal={user.userAt} />
        <label htmlFor="userBio">Enter your bio:</label>
        <TweetField
          id="userBio"
          name="userBio"
          defaultValue={user.info?.bio}
          placeholder="Write a little about yourself"
        ></TweetField>
        <div style={{ display: "flex", justifyContent: "right", gap: "8px" }}>
          <Button cancel type = 'button' onClick = {close}>Cancel</Button>
          <Button type = 'submit'>Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
