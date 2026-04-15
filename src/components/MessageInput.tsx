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
    <div
      style={{
        display: "flex",
        marginTop: "10px",
        background: "#ddd",
        borderRadius: "40px",
        padding: "10px",
      }}
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="escribe un mensaje"
        style={{
          flex: 1,
          border: "none",
          background: "transparent",
          fontSize: "20px",
        }}
      />

      <button onClick={sendMessage} style={{ border: "none", background: "green", color: "white", borderRadius: "50%", padding: "10px" }}>
        ▲
      </button>
    </div>
  );
}