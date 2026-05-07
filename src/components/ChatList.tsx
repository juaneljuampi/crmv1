// src/components/ChatList.tsx
import { useEffect, useState } from "react";

type Conversation = {
  id: number;
  customer_number: string;
};

type Props = {
  onSelectChat: (id: number) => void;
};

export default function ChatList({ onSelectChat }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/conversations`)
    .then(res => res.json())
    .then((data) => {
      console.log("CONVERSACIONES:", data);
      setConversations(data.conversations || data);
    })
    .catch(console.error);
}, []);

  return (
    <div className="chat-sidebar">
      <h3>Chats</h3>

      {conversations.map((conv) => (
        <div
          key={conv.id}
          className="chat-item"
          onClick={() => onSelectChat(conv.id)}
        >
          {conv.customer_number}
        </div>
      ))}
    </div>
  );
}