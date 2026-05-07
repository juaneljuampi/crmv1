import Sidebar from "../components/Sidebar";
import ClientPanel from "../components/ClientPanel";
import ChatModal from "../components/ChatModal";
import { useState } from "react";

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="app">
      <Sidebar onSelectChat={setSelectedChat} />

      <ClientPanel />

      <ChatModal
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
}