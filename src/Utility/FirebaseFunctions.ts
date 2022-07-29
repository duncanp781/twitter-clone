import { format } from "date-fns";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAdditionalUserInfo,
  AdditionalUserInfo,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  addDoc,
  collection,
  orderBy,
  query,
  limit,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { User as DBUser } from "../App";
import { TweetInfo } from "../Pages/Feed";

const firebaseConfig = {
  apiKey: "AIzaSyC8T3tt_11SSH8IWpTrQH8lvR_zitcDgoM",
  authDomain: "twitter-clone-f9ccd.firebaseapp.com",
  projectId: "twitter-clone-f9ccd",
  storageBucket: "twitter-clone-f9ccd.appspot.com",
  messagingSenderId: "713938873458",
  appId: "1:713938873458:web:3069ffbbf29d256911e6eb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const addUserToDB = async (user: DBUser) => {
  try {
    const userDoc = doc(db, "users/" + user.uId);
    setDoc(userDoc, {
      userName: user.userName,
      userAt: user.userAt,
    });
  } catch (e) {
    console.error("failed to add user to database with error: ", e);
  }
};

export const getUserFromDB = async (
  uId: string
): Promise<DBUser | undefined> => {
  const userDocRef = doc(db, "users/" + uId);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.data()) return undefined;
  return {
    uId,
    ...userDoc.data(),
  } as DBUser;
};

//Sign in the user with a pop up. If the user isn't in the DB, add it to the DB
//Returns the new user
export const signInUser = async (): Promise<boolean | null> => {
  try {
    let result = await signInWithPopup(auth, provider);
    let { isNewUser } = getAdditionalUserInfo(result) as AdditionalUserInfo;
    return isNewUser;
  } catch (error) {
    console.error("user sign in failed with error", error);
    return null;
  }
};

export const signOutUser = () => {
  signOut(auth).catch((error) => console.error("error signing out, ", error));
};

//Send a tweet to the database
export const createTweet = async (
  user: DBUser,
  tweetContent: string
): Promise<TweetInfo> => {
  let newTweet = {
    user,
    tweetContent: tweetContent,
    time: serverTimestamp(),
  };
  const newDoc = await addDoc(collection(db, "tweets"), newTweet);
  return { ...newTweet, time: "Just Now", id: newDoc.id };
};

export const deleteTweetFromDB = async(id: string) => {
  const tweetRef = doc(db, 'tweets', id);
  deleteDoc(tweetRef);
}


export const getNTweets = async (number: number): Promise<TweetInfo[]> => {
  let out: TweetInfo[] = [];
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(tweetsRef, orderBy("time", "desc"), limit(number));
  const tweetsSnapshot = await getDocs(tweetsQuery);
  tweetsSnapshot.forEach((doc) => {
    let newTime = (doc.data().time) ? format(doc.data().time.toDate(), "MM/dd/yyyy") : 'Just now';
    out.push({
      ...doc.data(),
      time: newTime,
    } as TweetInfo);
  });
  return out;
};
