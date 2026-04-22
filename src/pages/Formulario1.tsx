// src/pages/Formulario1.tsx
import { useState, type FormEvent } from "react";

type Contacto = {
  nombre: string;
  numero: string;
};

const PREFIJO_TELEFONO = "569";

const normalizarTelefono = (valor: string) => {
  const soloDigitos = valor.replace(/\D/g, "");

  if (!soloDigitos) {
    return "";
  }

  if (soloDigitos.startsWith(PREFIJO_TELEFONO)) {
    return soloDigitos;
  }

  return `${PREFIJO_TELEFONO}${soloDigitos}`;
};

const obtenerTelefonoSinPrefijo = (numero: string) => {
  if (!numero || numero === PREFIJO_TELEFONO) {
    return "";
  }

  return numero.startsWith(PREFIJO_TELEFONO)
    ? numero.slice(PREFIJO_TELEFONO.length)
    : numero;
};

export default function Formulario1() {
  const [clienteId, setClienteId] = useState("");
  const [contactos, setContactos] = useState<Contacto[]>([
    { nombre: "", numero: "" }
  ]);

  const [loading, setLoading] = useState(false);

  // Cambiar datos
  const handleChange = (
    index: number,
    campo: keyof Contacto,
    valor: string
  ) => {
    const nuevos = [...contactos];
    nuevos[index][campo] =
      campo === "numero" ? normalizarTelefono(valor) : valor;
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

  // Guardar
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const data = {
      clienteId,
      contactos
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
          { nombre: "", numero: "" }
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
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "auto"
      }}
    >
      <h1>Registro de Contactos</h1>

      <form onSubmit={handleSubmit}>
        {/* Número cliente */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Número Cliente 569..."
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
              required
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
              placeholder="Número de teléfono"
              required
              value={obtenerTelefonoSinPrefijo(item.numero)}
              inputMode="numeric"
              onChange={(e) =>
                handleChange(
                  index,
                  "numero",
                  e.target.value
                )
              }
              style={{
                marginLeft: "10px"
              }}
            />

            <span style={{ marginLeft: "10px" }}>+569</span>

            <button
              type="button"
              onClick={() =>
                eliminarContacto(index)
              }
              style={{
                marginLeft: "10px"
              }}
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
          disabled={loading}
          style={{
            marginLeft: "10px"
          }}
        >
          {loading
            ? "Guardando..."
            : "Guardar"}
        </button>
      </form>
    </div>
  );
}