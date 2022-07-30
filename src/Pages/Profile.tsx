import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { User, UserContext } from "../App";
import { Page } from "../Components/Styled/Page.styled";
import {
  createTweet,
  getNUserTweets,
  getUserFromDB,
} from "../Utility/FirebaseFunctions";
import BlankProfile from "../img/blank-profile.webp";
import {
  ProfileHeader,
  ProfileStyled,
} from "../Components/Styled/Profile.styled";
import { ProPic, UserName } from "../Components/Styled/Tweet.styled";
import { UserInfoStyled } from "../Components/Styled/Header.styled";
import { SubtitleText } from "../Components/Styled/Text.styled";
import { TweetInfo } from "./Feed";
import TweetDisplay from "../Components/TweetDisplay";
import { FeedStyled } from "../Components/Styled/Feed.styled";
import NewTweet from "../Components/NewTweet";
import EditIcon from "../img/edit.svg";
import EditProfile from "../Components/EditProfile";

export default function Profile() {
  const [profileUser, setProfileUser] = useState<User>({
    userName: "guest",
    userAt: "test",
    uId: "1",
  });
  const [tweetsToDisplay, setTweetsToDisplay] = useState<TweetInfo[]>([]);
  const user = useContext(UserContext);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  //This is needed in case there are no tweets to load, otherwise it would repeatedly query
  const [triedLoad, setTriedLoad] = useState<boolean>(false);
  let params = useParams();

  useEffect(() => {
    getUserFromDB(params.uId as string).then((profileUser) => {
      if (profileUser) {
        setProfileUser(profileUser);
        setProfileLoaded(true);
      }
    });
  }, [params.uId]);

  const updateProfileUser = () => {
    getUserFromDB(params.uId as string).then((profileUser) => {
      if (profileUser) {
        setProfileUser(profileUser);
        setProfileLoaded(true);
      }
    });
  };
  //If there are no tweets, load the 10 most recent tweets
  useEffect(() => {
    async function initTweets() {
      let out = await getNUserTweets(profileUser.uId, 10);
      setTweetsToDisplay(out);
      setTriedLoad(true);
    }

    profileLoaded && !triedLoad && tweetsToDisplay.length === 0 && initTweets();
  }, [profileLoaded, tweetsToDisplay, profileUser.uId, triedLoad]);

  const removeTweetFromFeed = (id: string) => {
    setTweetsToDisplay(tweetsToDisplay.filter((tweet) => tweet.id !== id));
  };

  return (
    <Page>
      {showEditProfile && (
        <EditProfile
          close={() => setShowEditProfile(false)}
          update={updateProfileUser}
        />
      )}
      <ProfileStyled>
        <ProfileHeader>
          <ProPic
            src={BlankProfile}
            alt="profile"
            style={{ border: `4px solid white` }}
            large
          />
        </ProfileHeader>
        <div>
          <UserInfoStyled>
            <span>
              <UserName large>{profileUser.userName}</UserName>
              <img
                src={EditIcon}
                alt="Edit Profile"
                style={{ height: "1.2rem" }}
                onClick={() => {
                  setShowEditProfile(true);
                }}
              />
            </span>
            <SubtitleText>@{profileUser.userAt}</SubtitleText>
          </UserInfoStyled>
        </div>
        <SubtitleText italic>
          {profileUser.info && profileUser.info.bio
            ? profileUser.info.bio
            : "This user does not have a bio"}
        </SubtitleText>
      </ProfileStyled>
      <FeedStyled>
        {user.uId === profileUser.uId ? (
          <NewTweet
            submit={async (tweetContent: string) => {
              let newTweet = await createTweet(user, tweetContent);
              setTweetsToDisplay([newTweet, ...tweetsToDisplay]);
            }}
          />
        ) : null}
        <TweetDisplay
          toDisplay={tweetsToDisplay}
          remove={removeTweetFromFeed}
        />
      </FeedStyled>
    </Page>
  );
}
