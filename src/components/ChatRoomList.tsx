import { CHAT_ROOMS } from "../consts/ChatConsts";
import { type ChatRoomType } from "../types/ChatRypes";

interface ChatRoomListProps {
  selectedRoom: ChatRoomType;
  onSelect: (room: ChatRoomType) => void;
}

export const ChatRoomList = ({ selectedRoom, onSelect }: ChatRoomListProps) => {
  return (
    <div className="chat-rooms-container">
      {CHAT_ROOMS.map((room) => {
        return (
          <div
            key={room}
            className={`chat-room-item  ${room === selectedRoom ? "active" : ""}`}
            onClick={() => onSelect(room)}
          >
            {room}
          </div>
        );
      })}
    </div>
  );
};
