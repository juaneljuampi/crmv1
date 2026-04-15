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
    <div
      style={{
        width: "280px",
        background: "#2c2c2c",
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        gap: "15px",
      }}
    >
      <h2>Listado de números</h2>

      {/* LISTA */}
      <div
        style={{
          background: "#000000",
          borderRadius: "20px",
          padding: "10px",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelectChat(conv.id)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid rgba(209, 207, 207, 0.1)",
            }}
          >
            {conv.customer_number}
          </div>
        ))}
      </div>

      {/* FORM */}
      <div
        style={{
          background: "#000000",
          borderRadius: "20px",
          padding: "30px",
          color: "white",
        }}
      >
        <input
          placeholder="numero (569...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={inputStyle}
        />

        <button style={buttonStyle} onClick={sendCustomMessage}>
          enviar mensaje
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: "8px",
  padding: "8px",
  borderRadius: "6px",
  border: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "20px",
  border: "none",
  background: "#f74646",
  cursor: "pointer",
};