type Props = {
  onSelect: (chatId: number) => void;
};

export default function Sidebar({ onSelect }: Props) {
  return (
    <div className="sidebar">
      <h3>Listado de números</h3>

      {/* EJEMPLO (puedes traer esto del backend después) */}
      <div className="contact" onClick={() => onSelect(1)}>
        +56911111111
      </div>

      <div className="contact" onClick={() => onSelect(2)}>
        +56922222222
      </div>
    </div>
  );
}