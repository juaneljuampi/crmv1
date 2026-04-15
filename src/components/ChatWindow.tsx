import { useEffect, useRef, useState } from "react";
import socket from "../socket";

type Props = {
  chatId: number | null;
  refresh: number;
};

type Message = {
  id?: number;
  text?: string;
  body?: string;
  sender: string;
};

export default function ChatWindow({ chatId, refresh }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔄 cargar mensajes desde API
  const loadMessages = () => {
    if (!chatId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/messages?conversationId=${chatId}`)
      .then(res => res.json())
      .then(data => {
        console.log("MENSAJES:", data);
        setMessages(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadMessages();
  }, [chatId, refresh]);

  // 🔥 SOCKET (mensajes en vivo)
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      if (msg.conversationId === chatId) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [chatId]);

  // 🔽 auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chatId) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Selecciona un chat
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        padding: "15px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        background: "#ece5dd", // 👈 estilo WhatsApp
      }}
    >
      {messages.map((msg, index) => {
        const text = msg.text || msg.body || "";
        const isMe = msg.sender === "me";

        return (
          <div
            key={msg.id || index}
            style={{
              display: "flex",
              justifyContent: isMe ? "flex-end" : "flex-start",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                background: isMe ? "#dcf8c6" : "#fff",
                padding: "10px 14px",
                borderRadius: "15px",
                maxWidth: "65%",
                boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
              }}
            >
              {text}
            </div>
          </div>
        );
      })}

      {/* 👇 para auto scroll */}
      <div ref={bottomRef} />
    </div>
  );
}