import "./styles/layout.css";
import "./styles/chat.css";
import "./styles/auth.css";
import "./styles/user.css";
import "./App.css"
import ChatRoom from "./pages/ChatRoom";
import { useUser } from "./context/UserContext";
import LoginPage from "./pages/LoginPage";
import UserMenu from "./components/UserMenu";

export default function App() {
  const user = useUser();

  return user ? (
    <>
      <UserMenu />
      <ChatRoom />
    </>
  ) : (
    <LoginPage />
  );
}
