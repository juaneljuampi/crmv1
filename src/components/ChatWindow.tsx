type Props = {
  messages: any[];
  selectedChat: any;
};

export default function ChatWindow({ messages, selectedChat }: Props) {
  return (
    <div className="chat-window">

      <div className="chat-header">
        {selectedChat ? selectedChat.number : "Selecciona un chat"}
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.fromMe ? "me" : "other"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

    </div>
  );
}