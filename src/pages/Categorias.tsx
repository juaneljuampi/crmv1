// src/pages/Categorias.tsx
import { useState } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [nueva, setNueva] = useState("");

  const agregar = () => {
    setCategorias([...categorias, nueva]);
    setNueva("");
  };

  return (
    <div>
      <h2>Categorías</h2>

      <input
        value={nueva}
        onChange={(e) => setNueva(e.target.value)}
      />

      <button onClick={agregar}>
        Agregar
      </button>

      <ul>
        {categorias.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}