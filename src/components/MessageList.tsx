import { useUser } from "../context/UserContext";
import type { Message } from "../firebase/firestore";

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  const user = useUser();

  return (
    <>
      {messages.map((msg) => {
        const isMe = msg.userName === user?.displayName;
        const photoURL = isMe
          ? user?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
          : msg.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";

        return (
          <div
            key={msg.id}
            className={`chat-message-bubble ${
              isMe ? "chat-message-me" : "chat-message-other"
            }`}
          >
            <img
              src={photoURL}
              alt={`${msg.userName} avatar`}
              className="chat-message-avatar"
            />
            <div className="chat-message-inner">
              <div className="chat-message-header">
                <span className="chat-message-name">{msg.userName}</span>
                <span className="chat-message-time">
                  {msg.createdAt?.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
              <div className="chat-message-text">{msg.text}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};
