// src/context/UserContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

const auth = getAuth();

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
