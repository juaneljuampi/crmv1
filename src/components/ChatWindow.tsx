import { useEffect, useRef, useState } from "react";
import socket from "../socket";
import "../styles/chat.css";
import MessageInput from "./MessageInput";
import "../styles/dashboard.css";

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

  /**
   * =========================
   * CARGAR MENSAJES
   * =========================
   */
  const loadMessages = async () => {
    if (!chatId) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/messages?conversationId=${chatId}`
      );

      const data = await res.json();

      // 🔥 PROTECCIÓN IMPORTANTE
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages(data.messages || []);
      }

    } catch (error) {
      console.error("Error cargando mensajes:", error);
    }
  };

  /**
   * =========================
   * EFFECT: CARGA INICIAL
   * =========================
   */
  useEffect(() => {
    loadMessages();
  }, [chatId, refresh]);

  /**
   * =========================
   * SOCKET TIEMPO REAL
   * =========================
   */
  useEffect(() => {
    const handler = (msg: any) => {
      if (msg.conversationId === chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [chatId]);

  /**
   * =========================
   * AUTO SCROLL
   * =========================
   */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * =========================
   * EMPTY STATE
   * =========================
   */
  if (!chatId) {
    return <div className="chat-empty">Selecciona un chat</div>;
  }

  /**
   * =========================
   * RENDER
   * =========================
   */
  return (
    <div className="chat-container whatsapp">

      {/* HEADER */}
      <div className="chat-header-pro">
        <div className="chat-user">
          <div className="avatar">👤</div>
          <div>
            <div className="name">usuario #{chatId}</div>
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
              key={msg.id ?? i}
              className={`message-row ${isMe ? "me" : "other"}`}
            >
              <div className={`bubble ${isMe ? "me" : "other"}`}>
                {text}

                {msg.timestamp && (
                  <div className="time">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      <MessageInput chatId={chatId} onMessageSent={loadMessages} />

        <div ref={bottomRef} />
      </div>
    </div>
  );
}