// src/pages/Mensajes.tsx
import { useState } from "react";

export default function Mensajes() {
  const [mensaje, setMensaje] = useState("");

  return (
    <div>
      <h2>Enviar Mensajes</h2>

      <textarea
        placeholder="Hola {nombre}..."
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />

      <button>Enviar</button>
    </div>
  );
}