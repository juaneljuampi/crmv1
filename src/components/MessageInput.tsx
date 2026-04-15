import { useState } from "react";

type Props = {
  chatId: number | null;
  onMessageSent: () => void;
};

export default function MessageInput({ chatId, onMessageSent }: Props) {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!number || !message) return;

    await fetch("https://TU-BACKEND.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chatId,
        number,
        message
      })
    });

    setMessage("");
    onMessageSent();
  };

  return (
    <div className="input-container">
      <input
        placeholder="Número (569...)"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <input
        placeholder="Mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={handleSend}>➤</button>
    </div>
  );
}