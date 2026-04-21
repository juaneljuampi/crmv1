import { useState } from "react";

type Props = {
  chatId: number | null;
  onMessageSent: () => void;
};

export default function MessageInput({ chatId, onMessageSent }: Props) {
  const [message, setMessage] = useState("");

  // 💬 mensaje normal
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

  // 🔘 BOTÓN CTA (Abrir CRM)
  const sendCTA = async () => {
    if (chatId === null) return;

    await fetch(`${import.meta.env.VITE_API_URL}/api/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: chatId,
        mode: "cta",
      }),
    });
  };

  return (
    <div className="message-input-container">
      
      {/* botón CTA */}
      <button onClick={sendCTA} className="cta-button">
        🔗
      </button>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje"
        className="message-input"
      />

      <button onClick={sendMessage} className="message-send-button">
        ➤
      </button>
    </div>
  );
}