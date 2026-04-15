import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import { useState } from "react";

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SIDEBAR */}
      <Sidebar onSelectChat={setSelectedChat} />

      {/* CHAT AREA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(180deg, #f6d365, #fda085)",
          padding: "20px",
        }}
      >
        <ChatWindow chatId={selectedChat} refresh={refresh} />

        <MessageInput
          chatId={selectedChat}
          onMessageSent={() => setRefresh(prev => prev + 1)}
        />
      </div>
    </div>
  );
}