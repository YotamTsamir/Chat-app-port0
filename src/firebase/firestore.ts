import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export type Message = {
  id?: string;
  room: string;
  text: string;
  userName: string;
  photoURL: string;
  userEmail:string;
  createdAt?: any;
};

// Add a new message
export const sendMessage = async (
  room: string,
  text: string,
  userName: string,
  photoURL: string,
  userEmail: string
) => {
  await addDoc(collection(db, "messages"), {
    room,
    text,
    userName,
    createdAt: serverTimestamp(),
    photoURL,
    userEmail,
  });
};

// Subscribe to messages in a specific room
export const subscribeToMessages = (
  room: string,
  callback: (messages: Message[]) => void
) => {
  const q = query(
    collection(db, "messages"),
    where("room", "==", room),
    orderBy("createdAt")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Message),
    }));
    callback(messages);
  });
};
