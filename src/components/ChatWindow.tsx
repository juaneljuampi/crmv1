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
      <div className="chat-empty">
        Selecciona un chat
      </div>
    );
  }

  return (
    <div className="chat-window">
      {messages.map((msg, index) => {
        const text = msg.text || msg.body || "";
        const isMe = msg.sender === "me";

        return (
          <div
            key={msg.id || index}
            className={`message-row ${isMe ? "me" : "other"}`}
          >
            <div className={`message-bubble ${isMe ? "me" : "other"}`}>
              {text}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}