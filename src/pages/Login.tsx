import { useNavigate } from "react-router-dom";
import "../styles/chat.css";
export default function Login() {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chat"); // 🔥 redirige a tu Home
  };

  return (
    <div className="login-container">
      <button className="Btn" onClick={goToChat}>
        <div className="sign">
          <svg viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z" />
          </svg>
        </div>

        <div className="text">Entrar</div>
      </button>
    </div>
  );
}