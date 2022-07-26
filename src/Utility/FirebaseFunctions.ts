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
  DocumentData,
  QueryDocumentSnapshot,
  DocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import BlankProfile from "../img/blank-profile.webp";
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
const db = getFirestore(app);
// const db = getFirestore();
// connectFirestoreEmulator(db, "localhost", 8080);
export const auth = getAuth();
export const storage = getStorage(app);
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

  let data = userDoc.data();
  if (!data) return undefined;

  let user = {
    uId,
    ...data,
    info: {
      ...data.info,
    },
  } as DBUser;
  const img = await getUserProPic(user);
  user.info.img = img;

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
    responses: [],
  };
  const newDoc = await addDoc(collection(db, "tweets"), newTweet);
  return { ...newTweet, user: user, time: "Just Now", id: newDoc.id };
};

export const createResponse = async (
  user: DBUser,
  respondingTo: TweetInfo,
  responseContent: string
): Promise<TweetInfo> => {
  let response = {
    user: user.uId,
    tweetContent: responseContent,
    time: serverTimestamp(),
    likes: [],
    responses: [],
  };
  const newDoc = await addDoc(collection(db, "responses"), response);
  await addResponseToTweet(newDoc.id, respondingTo);
  return { ...response, user: user, time: "Just Now", id: newDoc.id };
};

export const addResponseToTweet = async (
  responseId: string,
  respondingTo: TweetInfo
): Promise<void> => {
  let prev = respondingTo.responses ? respondingTo.responses : [];
  let tweet: any = {
    ...respondingTo,
    user: respondingTo.user.uId,
    responses: [...prev, responseId],
  };
  delete tweet.time;
  const newDoc = await updateDoc(doc(db, "tweets/" + respondingTo.id), tweet);
};

export const getNResponses = async (
  respondingTo: TweetInfo,
  number: number
): Promise<TweetInfo[]> => {
  let out: Promise<TweetInfo | undefined>[] = [];
  let numberOut = respondingTo.responses
    ? Math.min(respondingTo.responses.length, number)
    : 0;
  for (let i = 0; i < numberOut; i++) {
    let responseDocRef = doc(db, "responses/" + respondingTo.responses[i]);
    let responseRef = await getDoc(responseDocRef);
    out.push(getTweetFromDoc(responseRef));
  }

  let filtered = Promise.all(out).then((result) =>
    result.filter((result) => {
      return result !== undefined;
    })
  );
  return (await filtered) as TweetInfo[];
};

export const getUserProPic = async (user: DBUser): Promise<string> => {
  if (!user.info.hasImg) return BlankProfile;
  return await getDownloadURL(ref(storage, user.uId)).then(
    (url) => url,
    (err) => BlankProfile
  );
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
    likes: tweet.likes.filter((like) => like !== user.uId),
  };
  delete newTweet.time;
  newTweet.user = newTweet.user.uId;
  updateDoc(doc(db, "tweets/" + tweet.id), newTweet);
};

export const likeResponse = async (
  user: DBUser,
  tweet: TweetInfo
): Promise<void> => {
  let newTweet: any = {
    ...tweet,
    likes: [...tweet.likes, user.uId],
  };
  delete newTweet.time;
  newTweet.user = newTweet.user.uId;
  updateDoc(doc(db, "responses/" + tweet.id), newTweet);
};

export const unlikeResponse = async (
  user: DBUser,
  tweet: TweetInfo
): Promise<void> => {
  let newTweet: any = {
    ...tweet,
    likes: tweet.likes.filter((like) => like !== user.uId),
  };
  delete newTweet.time;
  newTweet.user = newTweet.user.uId;
  updateDoc(doc(db, "responses/" + tweet.id), newTweet);
};

export const deleteTweetFromDB = async (id: string) => {
  const tweetRef = doc(db, "tweets", id);
  const tweetDoc = await getDoc(tweetRef);
  const tweet = tweetDoc.data();
  if (tweet) {
    for (let response of tweet.responses) {
      deleteResponse(response);
    }
  }
  deleteDoc(tweetRef);
};

export const deleteResponse = async(id: string) => {
  const responseRef = doc(db, 'responses', id);
  deleteDoc(responseRef);
}

export const getTweetFromDoc = async (
  doc: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>
): Promise<TweetInfo | undefined> => {
  let data = doc.data();
  if (!data) return undefined;
  let newTime = data.time
    ? format(data.time.toDate(), "MM/dd/yyyy")
    : "Just now";
  let userId = data.user;
  let user = await getUserFromDB(userId);
  if (!user) {
    console.error("Tweet contains reference to nonexistent user");
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
