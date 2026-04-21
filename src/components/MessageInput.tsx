import { useState } from "react";

type Props = {
  chatId: number | null;
  onMessageSent: () => void;
};

export default function MessageInput({ chatId, onMessageSent }: Props) {
  const [message, setMessage] = useState("");

  // 💬 MENSAJE NORMAL
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

  // 🔗 BOTÓN CTA (FORMULARIO)
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
    <div className="chat-input-pro">

      {/* 🔗 IZQUIERDA - BOTÓN FORMULARIO */}
      <button onClick={sendCTA} className="cta-btn">
        🔗
      </button>

      {/* 💬 CENTRO - INPUT */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="input-pro"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />

      {/* 📤 DERECHA - BOTÓN ENVIAR */}
      <button onClick={sendMessage} className="send-btn">
        ➤
      </button>

    </div>
  );
}