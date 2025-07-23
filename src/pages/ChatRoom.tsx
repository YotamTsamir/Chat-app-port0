import { useState } from "react";
import Chat from "../components/Chat";
import { ChatRoomList } from "../components/ChatRoomList";
import type { ChatRoomType } from "../types/ChatRypes"; // assuming typo in filename

const ChatRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType>("Tech");

  return (
    <div className="chat-page-layout">
      <div className="chat-sidebar">
        <ChatRoomList
          selectedRoom={selectedRoom}
          onSelect={setSelectedRoom}
        />
      </div>
      <div className="chat-main-window">
        <Chat room={selectedRoom} />
      </div>
    </div>
  );
};

export default ChatRoom;
