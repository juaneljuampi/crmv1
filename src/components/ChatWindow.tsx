import { useEffect, useState } from "react";

type Props = {
  chatId: number | null;
  refresh: number;
};

export default function ChatWindow({ chatId, refresh }: Props) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!chatId) return;

    // 🔌 AQUÍ LLAMAS TU BACKEND
    fetch(`https://TU-BACKEND.com/messages/${chatId}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [chatId, refresh]);

  return (
    <div className="chat-window">

      <div className="chat-header">
        {chatId ? `Chat ${chatId}` : "Selecciona un chat"}
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.fromMe ? "me" : "other"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

    </div>
  );
}