import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import { useState } from "react";

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="app">
      
      {/* SIDEBAR */}
      <Sidebar onSelectChat={setSelectedChat} />

      {/* CHAT AREA */}
      <div className="chat-container">
        <ChatWindow chatId={selectedChat} refresh={refresh} />

        <MessageInput
          chatId={selectedChat}
          onMessageSent={() => setRefresh(prev => prev + 1)}
        />
      </div>
    </div>
  );
}