import { format } from "date-fns";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAdditionalUserInfo,
  AdditionalUserInfo,
} from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
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
  where,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentSnapshot,
  DocumentReference,
  updateDoc,
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
//If I want to use the real deal instead of the emulator
//const db  = getFirestore(app);
const db = getFirestore();
connectFirestoreEmulator(db, "localhost", 8080);
export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const addUserToDB = async (user: DBUser) => {
  try {
    const userDoc = doc(db, "users/" + user.uId);
    let toAdd: any = user;
    delete toAdd.uId;
    setDoc(userDoc, {
      ...toAdd,
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
  let user = {
    uId,
    ...userDoc.data(),
  } as DBUser;
  return user;
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
    user: user.uId,
    tweetContent: tweetContent,
    time: serverTimestamp(),
    likes: [],
  };
  console.log("creating the following tweet:", newTweet);
  const newDoc = await addDoc(collection(db, "tweets"), newTweet);
  return { ...newTweet, user: user, time: "Just Now", id: newDoc.id };
};

export const getTweetFromID = async (
  tweetID: string
): Promise<TweetInfo | undefined> => {
  const tweetDocRef = doc(db, "tweets/" + tweetID);
  const tweetDoc = await getDoc(tweetDocRef);
  return await getTweetFromDoc(tweetDoc);
};

export const likeTweet = async (
  user: DBUser,
  tweet: TweetInfo
): Promise<void> => {
  let newTweet: any = {
    ...tweet,
    likes: [...tweet.likes, user.uId],
  };
  delete newTweet.time;
  newTweet.user = newTweet.user.uId;
  updateDoc(doc(db, "tweets/" + tweet.id), newTweet);
};

export const unlikeTweet = async (
  user: DBUser,
  tweet: TweetInfo
): Promise<void> => {
  let newTweet: any = {
    ...tweet,
    likes: tweet.likes.filter(like => (like !== user.uId)),
  };
  delete newTweet.time;
  newTweet.user = newTweet.user.uId;
  updateDoc(doc(db, "tweets/" + tweet.id), newTweet);

};

export const deleteTweetFromDB = async (id: string) => {
  const tweetRef = doc(db, "tweets", id);
  deleteDoc(tweetRef);
};

export const getTweetFromDoc = async (
  doc: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>
): Promise<TweetInfo | undefined> => {
  let data = doc.data();
  console.log("the tweet data is", data);
  if (!data) return undefined;
  let newTime = data.time
    ? format(data.time.toDate(), "MM/dd/yyyy")
    : "Just now";
  let userId = data.user;
  let user = await getUserFromDB(userId);
  if (!user) {
    console.log("failed to get user");
    return undefined;
  }
  return {
    ...data,
    user: user,
    time: newTime,
    id: doc.id,
  } as TweetInfo;
};

export const getNTweets = async (number: number): Promise<TweetInfo[]> => {
  let out: Promise<TweetInfo | undefined>[] = [];
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(tweetsRef, orderBy("time", "desc"), limit(number));
  const tweetsSnapshot = await getDocs(tweetsQuery);
  tweetsSnapshot.forEach((doc) => {
    let tweet = getTweetFromDoc(doc);
    out.push(tweet);
  });
  let filtered = Promise.all(out).then((result) =>
    result.filter((result) => {
      return result !== undefined;
    })
  );
  return (await filtered) as TweetInfo[];
};

export const getNUserTweets = async (
  uId: string,
  number: number
): Promise<TweetInfo[]> => {
  let out: Promise<TweetInfo | undefined>[] = [];
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(
    tweetsRef,
    where("user", "==", uId),
    orderBy("time", "desc"),
    limit(number)
  );
  const tweetsSnapshot = await getDocs(tweetsQuery);
  tweetsSnapshot.forEach((doc) => {
    let tweet = getTweetFromDoc(doc);
    if (tweet) {
      out.push(tweet);
    }
  });
  let filtered = Promise.all(out).then((result) =>
    result.filter((result) => {
      return result !== undefined;
    })
  );
  return (await filtered) as TweetInfo[];
};
