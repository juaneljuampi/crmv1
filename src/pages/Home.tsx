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

      {/* CHAT MODAL (MITAD DERECHA) */}
      {selectedChat !== null && (
        <div
          style={{
            position: "fixed",
            top: "1cm",
            right: 0,
            width: "25vw",
            height: "calc(100vh - 2cm)",
            background: "#fff",
            boxShadow: "-8px 0 24px rgba(0, 0, 0, 0.18)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={() => setSelectedChat(null)}
            style={{
              alignSelf: "flex-end",
              margin: "10px",
              border: "none",
              background: "transparent",
              color: "#d00000",
              fontSize: "24px",
              fontWeight: 700,
              cursor: "pointer",
            }}
            aria-label="Cerrar chat"
          >
            ×
          </button>

          <div
            className="chat-container"
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div style={{ flex: 1, minHeight: 0 }}>
              <ChatWindow chatId={selectedChat} refresh={refresh} />
            </div>

            <MessageInput
              chatId={selectedChat}
              onMessageSent={() => setRefresh(prev => prev + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
}