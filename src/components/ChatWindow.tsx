import { useEffect, useRef, useState } from "react";
import socket from "../socket";
import "../styles/chat.css";

type Props = {
  chatId: number | null;
  refresh: number;
};

type Message = {
  id?: number;
  text?: string;
  body?: string;
  sender: string;
  timestamp?: string;
};

export default function ChatWindow({ chatId, refresh }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const loadMessages = () => {
    if (!chatId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/messages?conversationId=${chatId}`)
      .then(res => res.json())
      .then(setMessages)
      .catch(console.error);
  };

  useEffect(() => {
    loadMessages();
  }, [chatId, refresh]);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chatId) {
    return <div className="chat-empty">Selecciona un chat</div>;
  }

  return (
    <div className="chat-container">

      {/* HEADER */}
      <div className="chat-header-pro">
        <div className="chat-user">
          <div className="avatar">👤</div>
          <div>
            <div className="name">Cliente #{chatId}</div>
            <div className="status">En línea</div>
          </div>
        </div>
      </div>

      {/* MENSAJES */}
      <div className="chat-body">
        {messages.map((msg, i) => {
          const text = msg.text || msg.body || "";
          const isMe = msg.sender === "me";

          return (
            <div
              key={msg.id || i}
              className={`message-row ${isMe ? "me" : "other"}`}
            >
              <div className={`bubble ${isMe ? "me" : "other"}`}>
                {text}
                <div className="time">
                  {msg.timestamp
                    ? new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}