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
    const handleNewMessage = (msg: any) => {
      if (msg.conversationId === chatId) {
        setMessages(prev => [...prev, msg]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chatId) {
    return <div className="chat-empty">Selecciona un chat</div>;
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