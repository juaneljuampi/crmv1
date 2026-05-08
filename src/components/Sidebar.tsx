// src/components/Sidebar.tsx
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname.includes(path);

  return (
    <div className="sidebar">
      <h2 className="logo">📲 vista dashboard</h2>

      <button
        onClick={() => navigate("/")}
        className={isActive("/") ? "active" : ""}
      >
        📊 Dashboard
      </button>

      <button
        onClick={() => navigate("/clientes")}
        className={isActive("/clientes") ? "active" : ""}
      >
        👥 Clientes
      </button>

      <button
        onClick={() => navigate("/chats")}
        className={isActive("/chats") ? "active" : ""}
      >
        💬 Chats
      </button>
    </div>
  );
}