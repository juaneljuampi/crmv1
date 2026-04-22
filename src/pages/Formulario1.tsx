// src/pages/Formulario1.tsx
import { useState, type FormEvent } from "react";

type Contacto = {
  nombre: string;
  numero: string;
};

export default function Formulario1() {
  const [clienteId, setClienteId] = useState("");
  const [contactos, setContactos] = useState<Contacto[]>([
    { nombre: "", numero: "" }
  ]);

  // Cambiar datos
  const handleChange = (
    index: number,
    campo: keyof Contacto,
    valor: string
  ) => {
    const nuevos = [...contactos];
    nuevos[index][campo] = valor;
    setContactos(nuevos);
  };

  // Agregar fila
  const agregarContacto = () => {
    setContactos([
      ...contactos,
      { nombre: "", numero: "" }
    ]);
  };

  // Eliminar fila
  const eliminarContacto = (index: number) => {
    const nuevos = contactos.filter((_, i) => i !== index);
    setContactos(nuevos);
  };

  // Guardar todo con ID cliente
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      clienteId,
      contactos
    };

    console.log(data);

    alert("Cliente y contactos guardados");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Registro de Contactos</h1>

      <form onSubmit={handleSubmit}>
        {/* ID Cliente */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="ID Cliente"
            value={clienteId}
            onChange={(e) =>
              setClienteId(e.target.value)
            }
            style={{
              padding: "10px",
              width: "250px"
            }}
          />
        </div>

        {/* Contactos */}
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
                handleChange(
                  index,
                  "nombre",
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Número"
              value={item.numero}
              onChange={(e) =>
                handleChange(
                  index,
                  "numero",
                  e.target.value
                )
              }
              style={{ marginLeft: "10px" }}
            />

            <button
              type="button"
              onClick={() =>
                eliminarContacto(index)
              }
              style={{ marginLeft: "10px" }}
            >
              Eliminar
            </button>
          </div>
        ))}

        {/* Botones */}
        <button
          type="button"
          onClick={agregarContacto}
        >
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