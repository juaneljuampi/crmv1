import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

export default function Home() {
  const [conversations] = useState([
    { number: "56911111111" },
    { number: "56922222222" }
  ]);

  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const handleSelectChat = (chat: any) => {
    setSelectedChat(chat);
    setMessages([]);
  };

  const handleSend = (text: string) => {
    const newMessage = { text, fromMe: true };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        onSelect={handleSelectChat}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow
          messages={messages}
          selectedChat={selectedChat}
        />

        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}