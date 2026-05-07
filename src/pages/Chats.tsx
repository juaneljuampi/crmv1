// src/pages/Chats.tsx
import { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import "../styles/chat.css";

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  return (
    <div className="chat-layout">
      
      <ChatList onSelectChat={setSelectedChat} />
      <ChatWindow chatId={selectedChat} refresh={0} />
    </div>
  );
}