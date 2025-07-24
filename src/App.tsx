import "./styles/layout.css";
import "./styles/chat.css";
import "./styles/auth.css";
import "./styles/user.css";
import "./App.css";

import ChatRoom from "./pages/ChatRoom";
import { useUser } from "./context/UserContext";
import UserMenu from "./components/UserMenu";
import { Loader } from "./components/Loader";
import AuthModal from "./components/AuthModal";
import { useState } from "react";

export default function App() {
  const {  loading } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) return <Loader />;

  return (
    <>
      <UserMenu />
      <ChatRoom />
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
