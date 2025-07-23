import { useState } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <input
        className="chat-input-field"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit" className="chat-input-button">
        Send
      </button>
    </form>
  );
};

export default MessageInput;
