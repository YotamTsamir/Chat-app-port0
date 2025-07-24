import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

export const register = async (
  email: string,
  password: string,
  displayName: string,
  photoURL?: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName, photoURL });
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginAnonymously = () => signInAnonymously(auth);

export const logout = () => signOut(auth);
