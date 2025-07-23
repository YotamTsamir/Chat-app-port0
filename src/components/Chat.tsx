import { useEffect, useState, useRef } from "react";
import {
  subscribeToMessages,
  sendMessage,
  type Message,
} from "../firebase/firestore";
import type { ChatRoomType } from "../types/ChatRypes";
import { useUser } from "../context/UserContext";
import { DEFAULT_IMG } from "../consts/ChatConsts";
import { MessageList } from "./MessageList";
import MessageInput from "./MessageInput";
import { Loader } from "./Loader";

interface ChatProps {
  room: ChatRoomType;
}

const Chat = ({ room }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToMessages(room, (newMessages: Message[]) => {
      setLoading(false);
      setMessages(newMessages);
    });
    return () => {
      unsubscribe();
      setLoading(true);
    };
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    await sendMessage(
      room,
      text,
      user?.displayName || "Anonymous",
      user?.photoURL || DEFAULT_IMG,
      user?.email || ""
    );
  };

  return (
    <div className="chat-room-container">
      <h2 className="chat-room-title">{room} Room</h2>

      <div className="chat-messages">
        {loading ? <Loader /> : <MessageList messages={messages} />}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;
