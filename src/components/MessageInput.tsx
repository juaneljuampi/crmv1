import { useState } from "react";

type Props = {
  chatId: number | null;
  onMessageSent: () => void;
};

export default function MessageInput({ chatId, onMessageSent }: Props) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim() || chatId === null) return;

    await fetch(`${import.meta.env.VITE_API_URL}/api/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        to: "56992144697",
        body: message,
      }),
    });

    setMessage("");
    onMessageSent();
  };

  return (
    <div className="message-input-container">
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