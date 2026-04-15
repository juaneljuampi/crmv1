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

  // 🔄 cargar conversaciones
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/conversations`)
      .then(res => res.json())
      .then(setConversations)
      .catch(console.error);
  }, []);

  // 📲 enviar mensaje manual
  const sendCustomMessage = async () => {
    if (!phone || !message) return;

    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Chats</h2>

      {/* LISTA */}
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

      {/* FORM */}
      <div className="sidebar-form">
        <input
          placeholder="numero (569...)"
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
          enviar mensaje
        </button>
      </div>
    </div>
  );
}