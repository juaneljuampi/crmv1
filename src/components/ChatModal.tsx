import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import "../styles/dashboard.css";

type Props = {
  selectedChat: number | null;
  setSelectedChat: (id: number | null) => void;
  refresh: number;
  setRefresh: (fn: (prev: number) => number) => void;
};

export default function ChatModal({
  selectedChat,
  setSelectedChat,
  refresh,
  setRefresh,
}: Props) {
  if (selectedChat === null) return null;

  return (
    <div className="chat-modal">
      <button onClick={() => setSelectedChat(null)}>×</button>

      <ChatWindow chatId={selectedChat} refresh={refresh} />

      <MessageInput
        chatId={selectedChat}
        onMessageSent={() =>
          setRefresh((prev) => prev + 1)
        }
      />
    </div>
  );
}