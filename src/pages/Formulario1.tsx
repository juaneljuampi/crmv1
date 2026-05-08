// src/pages/Formulario1.tsx
import { useState, type FormEvent } from "react";

type Contacto = {
  nombre: string;
  numero: string;
  categoria: string; // 🔥 AHORA POR CONTACTO
};

export default function Formulario1() {
  const [clienteId, setClienteId] = useState("");

  const [contactos, setContactos] = useState<Contacto[]>([
    { nombre: "", numero: "", categoria: "" }
  ]);

  const [loading, setLoading] = useState(false);

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
      { nombre: "", numero: "", categoria: "" }
    ]);
  };

  // Eliminar fila
  const eliminarContacto = (index: number) => {
    const nuevos = contactos.filter((_, i) => i !== index);
    setContactos(nuevos);
  };

  // Guardar
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const data = {
      clienteId,
      contactos // 🔥 YA INCLUYE categoria
    };

    try {
      setLoading(true);

      const response = await fetch(
        "https://backend-api-whatsapp-crm.onrender.com/api/clientes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("✅ Guardado correctamente");

        setClienteId("");
        setContactos([
          { nombre: "", numero: "", categoria: "" }
        ]);
      } else {
        alert("❌ " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: "30px",
      maxWidth: "700px",
      margin: "auto"
    }}>
      <h1>Registro de Contactos</h1>

      <form onSubmit={handleSubmit}>
        {/* Cliente */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Número Cliente"
            value={clienteId}
            required
            onChange={(e) =>
              setClienteId(e.target.value)
            }
            style={{
              padding: "10px",
              width: "100%"
            }}
          />
        </div>

        {/* CONTACTOS */}
        {contactos.map((item, index) => (
          <div key={index} style={{
            marginBottom: "15px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px"
          }}>
            <input
              type="text"
              placeholder="Nombre"
              required
              value={item.nombre}
              onChange={(e) =>
                handleChange(index, "nombre", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Número"
              required
              value={item.numero}
              onChange={(e) =>
                handleChange(index, "numero", e.target.value)
              }
              style={{ marginLeft: "10px" }}
            />

            {/* 🔥 CATEGORIA POR CONTACTO */}
            <select
              required
              value={item.categoria}
              onChange={(e) =>
                handleChange(index, "categoria", e.target.value)
              }
              style={{ marginLeft: "10px" }}
            >
              <option value="">Categoría</option>
              <option value="ventas">Ventas</option>
              <option value="RRHH">RRHH</option>
              <option value="Servicio al cliente">Servicio al cliente</option>
              <option value="Contabilidad">Contabilidad</option>
            </select>

            <button
              type="button"
              onClick={() => eliminarContacto(index)}
              style={{ marginLeft: "10px" }}
            >
              Eliminar
            </button>
          </div>
        ))}

        {/* BOTONES */}
        <button type="button" onClick={agregarContacto}>
          + Agregar Otro
        </button>

        <button
          type="submit"
          disabled={loading}
          style={{ marginLeft: "10px" }}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}