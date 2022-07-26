import { ref, uploadBytes } from "firebase/storage";
import React, { useContext } from "react";
import { TriggerUserUpdate, UserContext } from "../App";
import {
  addUserToDB,
  getUserProPic,
  storage,
} from "../Utility/FirebaseFunctions";
import Modal from "./Modal";
import { Button } from "./Styled/Button.styled";
import { lightTheme } from "./Styled/Themes";
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
          const userProPicInput = form.elements.namedItem(
            "userProPic"
          ) as HTMLInputElement;

          let gotProPic = false;
          let newProPic;
          const userProPics = userProPicInput.files;
          let userProPic = userProPics ? userProPics[0] : null;
          if (userProPic && userProPic.size < 3145728) {
            const storageRef = ref(storage, user.uId);
            uploadBytes(storageRef, userProPic).then(() => {
              triggerUpdate();
            });
            gotProPic = true;
          }

          const editedUser = {
            ...user,
            userName: userNameInput.value,
            userAt: userAtInput.value,
            info: {
              ...user.info,
              bio: userBioInput.value,
              hasImg: user.info.hasImg || gotProPic,
            },
          };
          getUserProPic(editedUser)
            .then((result) => {
              editedUser.info.img = result;
            })
            .then((result) => {
              addUserToDB(editedUser);
              triggerUpdate();
              update();
              close();
            });
        }}
      >
        <TextInput
          id="userName"
          text="Enter your username:"
          defaultVal={user.userName}
          maxlength={30}
        />
        <TextInput id="userAt" text="Enter your at:" defaultVal={user.userAt} 
        maxlength = {30}/>
        <label htmlFor="userBio">Enter your bio:</label>
        <TweetField
          id="userBio"
          name="userBio"
          defaultValue={user.info?.bio}
          placeholder="Write a little about yourself"
          style = {{border: `2px solid ${lightTheme.dark}`}}
          maxLength={250}
        ></TweetField>
        <label htmlFor="userProPic">
          Upload a profile picture: (Max Size 3MB)
          <input type="file" id="userProPic" accept="image/*" />
        </label>
        <div style={{ display: "flex", justifyContent: "right", gap: "8px" }}>
          <Button cancel type="button" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
