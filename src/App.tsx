import "./styles/layout.css";
import "./styles/chat.css";
import "./styles/auth.css";
import "./styles/user.css";
import "./App.css";

import ChatRoom from "./pages/ChatRoom";
import { useUser } from "./context/UserContext";
import LoginPage from "./pages/LoginPage";
import UserMenu from "./components/UserMenu";
import { Loader } from "./components/Loader";

export default function App() {
  const { user, loading } = useUser();

  if (loading) return <Loader />;

  if (!user) return <LoginPage />;

  return (
    <>
      <UserMenu />
      <ChatRoom />
    </>
  );
}
