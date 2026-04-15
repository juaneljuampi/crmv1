type Props = {
  conversations: any[];
  onSelect: (chat: any) => void;
};

export default function Sidebar({ conversations, onSelect }: Props) {
  return (
    <div className="sidebar">
      <h3>Chats</h3>

      {conversations.map((c, i) => (
        <div
          key={i}
          className="contact"
          onClick={() => onSelect(c)}
        >
          {c.number}
        </div>
      ))}
    </div>
  );
}