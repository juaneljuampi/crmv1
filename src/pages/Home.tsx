import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="app">
      <Sidebar onSelect={setSelectedChat} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow chatId={selectedChat} refresh={refresh} />

        <MessageInput
          chatId={selectedChat}
          onMessageSent={() => setRefresh(prev => prev + 1)}
        />
      </div>
    </div>
  );
}