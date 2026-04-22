// src/pages/Formulario1.jsx
import { useState, type FormEvent } from "react";

type Contacto = {
  nombre: string;
  numero: string;
};

export default function Formulario1() {
  const [contactos, setContactos] = useState<Contacto[]>([
    { nombre: "", numero: "" }
  ]);

  const [mensaje, setMensaje] = useState("");

  // Cambiar datos
  const handleChange = (index: number, campo: keyof Contacto, valor: string) => {
    const nuevos = [...contactos];
    nuevos[index][campo] = valor;
    setContactos(nuevos);
  };

  // Agregar fila
  const agregarContacto = () => {
    setContactos([...contactos, { nombre: "", numero: "" }]);
  };

  // Eliminar fila
  const eliminarContacto = (index: number) => {
    const nuevos = contactos.filter((_, i) => i !== index);
    setContactos(nuevos);
  };

  // Guardar
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(contactos);
    alert("Contactos guardados");
  };

  // Enviar otro formulario por WhatsApp
  const enviarFormulario = (numero: string) => {
    const linkFormulario =
      "https://tuusuario.github.io/tuproyecto/formulario2";

    const texto = `Hola, te envío este formulario: ${linkFormulario}`;

    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Formulario de Contactos</h1>

      <form onSubmit={handleSubmit}>
        {contactos.map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            <input
              type="text"
              placeholder="Nombre"
              value={item.nombre}
              onChange={(e) =>
                handleChange(index, "nombre", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Número"
              value={item.numero}
              onChange={(e) =>
                handleChange(index, "numero", e.target.value)
              }
              style={{ marginLeft: "10px" }}
            />

            <button
              type="button"
              onClick={() => eliminarContacto(index)}
              style={{ marginLeft: "10px" }}
            >
              Eliminar
            </button>

            <button
              type="button"
              onClick={() => enviarFormulario(item.numero)}
              style={{ marginLeft: "10px" }}
            >
              Enviar Formulario
            </button>
          </div>
        ))}

        <button type="button" onClick={agregarContacto}>
          + Agregar Otro
        </button>

        <button
          type="submit"
          style={{ marginLeft: "10px" }}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}