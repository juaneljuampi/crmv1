// src/components/Sidebar.tsx
export default function Sidebar({ setPage }: any) {
  return (
    <div className="sidebar">
      <h2 className="logo">📲 vista dashboard </h2>

      <button onClick={() => setPage("dashboard")}>
        📊 Dashboard
      </button>

      <button onClick={() => setPage("clientes")}>
        👥 Clientes
      </button>


      <button onClick={() => setPage("chats")}>
        💬 Chats
      </button>
    </div>
  );
}