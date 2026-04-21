import { useState } from "react";

type Props = {
  chatId: number | null;
  onMessageSent: () => void;
};

export default function MessageInput({ chatId, onMessageSent }: Props) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim() || chatId === null) return;

    await fetch(`${import.meta.env.VITE_API_URL}/api/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: chatId,
        message,
      }),
    });

    setMessage("");
    onMessageSent();
  };

  return (
    <div className="chat-input-pro">

      {/* BOTÓN WHATSAPP */}
      <button className="Btn" onClick={sendMessage}>
        <div className="sign">
          <svg viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z"/>
          </svg>
        </div>
        <div className="text">Enviar</div>
      </button>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="input-pro"
      />
    </div>
  );
}