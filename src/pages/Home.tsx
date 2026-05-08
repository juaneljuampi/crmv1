import Sidebar from "../components/Sidebar";
import ClientPanel from "../components/ClientPanel";
import ChatModal from "../components/ChatModal";
import "../styles/dashboard.css";

import { useState } from "react";

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="app">
      <Sidebar />

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