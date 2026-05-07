export default function Login({ onLogin }: any) {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input placeholder="Usuario" />

        <input
          type="password"
          placeholder="Contraseña"
        />

        <button onClick={onLogin}>
          Ingresar
        </button>
      </div>
    </div>
  );
}