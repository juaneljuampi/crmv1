import { useEffect, useState } from "react";

type Conversation = {
  id: number;
  customer_number: string;
};

type Props = {
  onSelectChat: (id: number) => void;
};

export default function Sidebar({ onSelectChat }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/conversations`)
      .then(res => res.json())
      .then(setConversations)
      .catch(console.error);
  }, []);

  const sendCustomMessage = async () => {
    if (!phone || !message) return;

    await fetch(`${import.meta.env.VITE_API_URL}/api/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: phone,
        body: message,
      }),
    });

    setMessage("");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">Chats</div>

      <div className="sidebar-list">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelectChat(conv.id)}
            className="contact"
          >
            {conv.customer_number}
          </div>
        ))}
      </div>

      <div className="sidebar-form">
        <input
          placeholder="569..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
        />

        <input
          placeholder="mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input"
        />

        <button className="send-button" onClick={sendCustomMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}