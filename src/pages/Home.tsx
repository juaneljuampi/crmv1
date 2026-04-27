import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import { useState } from "react";

type Contacto = {
  id_contacto: number;
  nombre: string;
  numero: string;
};

export default function Home() {
  const VITE_API_URL =
    import.meta.env.VITE_API_URL as string;

  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  // NUEVO PANEL CLIENTES
  const [clienteId, setClienteId] = useState("");
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * ===================================
   * BUSCAR CLIENTE (GET)
   * ===================================
   */
  const buscarCliente = async () => {
    if (!clienteId) return;

    try {
      setLoading(true);

      const response = await fetch(
        `https://backend-api-whatsapp-crm.onrender.com/api/clientes/${clienteId}`
      );

      const data = await response.json();

      if (data.ok) {
        setContactos(data.contactos);
        setSeleccionados([]);
      } else {
        alert("No encontrado");
      }
    } catch (error) {
      console.log(error);
      alert("Error al buscar");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ===================================
   * CHECKBOX
   * ===================================
   */
  const toggleSeleccion = (id: number) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(
        seleccionados.filter((x) => x !== id)
      );
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  /**
   * ===================================
   * ELIMINAR CONTACTO
   * ===================================
   */
  const eliminarContacto = async () => {
    if (seleccionados.length === 0) return;

    try {
      for (const id of seleccionados) {
        await fetch(
          `https://backend-api-whatsapp-crm.onrender.com/api/clientes/contacto/${id}`,
          {
            method: "DELETE"
          }
        );
      }

      buscarCliente();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * ===================================
   * ELIMINAR CLIENTE
   * ===================================
   */
  const eliminarCliente = async () => {
    if (!clienteId) return;

    const ok = confirm(
      "¿Eliminar cliente completo?"
    );

    if (!ok) return;

    try {
      await fetch(
        `https://backend-api-whatsapp-crm.onrender.com/api/clientes/${clienteId}`,
        {
          method: "DELETE"
        }
      );

      setContactos([]);
      setClienteId("");
      setSeleccionados([]);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * ===================================
   * ENVIAR FORMULARIO
   * ===================================
   */
  const enviarFormulario = async () => {
  if (seleccionados.length === 0) {
    alert("Selecciona al menos un contacto");
    return;
  }

  try {
    for (const item of contactos) {
      if (
        seleccionados.includes(
          item.id_contacto
        )
      ) {
       await fetch(`${VITE_API_URL}/api/send-message`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    to: item.numero,
    mode: "cta"
  })
});
      }
    }

    alert(
      "Formulario enviado a seleccionados"
    );
  } catch (error) {
    console.log(error);
    alert("Error al enviar");
  }
};

  return (
    <div className="app">
      {/* SIDEBAR */}
      <Sidebar onSelectChat={setSelectedChat} />

      {/* NUEVO PANEL CLIENTE */}
      <div
        style={{
          position: "fixed",
          left: "260px",
          top: 0,
          bottom: 0,
          width: "300px",
          background: "#111",
          color: "white",
          padding: "15px",
          overflowY: "auto",
          borderRight: "1px solid #333"
        }}
      >
        <h3>Buscar Cliente</h3>

        <input
          value={clienteId}
          onChange={(e) =>
            setClienteId(e.target.value)
          }
          placeholder="Número Cliente"
          style={{
            width: "100%",
            padding: "10px"
          }}
        />

        <button
          onClick={buscarCliente}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px"
          }}
        >
          {loading
            ? "Buscando..."
            : "Buscar"}
        </button>

        <hr />

        {contactos.map((item) => (
          <label
            key={item.id_contacto}
            style={{
              display: "block",
              marginBottom: "10px",
              cursor: "pointer"
            }}
          >
            <input
              type="checkbox"
              checked={seleccionados.includes(
                item.id_contacto
              )}
              onChange={() =>
                toggleSeleccion(
                  item.id_contacto
                )
              }
            />{" "}
            {item.nombre}
            <br />
            <small>{item.numero}</small>
          </label>
        ))}

        {contactos.length > 0 && (
          <>
            <button
              onClick={enviarFormulario}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                background: "green",
                color: "white"
              }}
            >
              Enviar Formulario
            </button>

            <button
              onClick={eliminarContacto}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                background: "orange"
              }}
            >
              Eliminar Seleccionado
            </button>

            <button
              onClick={eliminarCliente}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                background: "red",
                color: "white"
              }}
            >
              Eliminar Cliente
            </button>
          </>
        )}
      </div>

      {/* CHAT MODAL (NO TOCADO) */}
      {selectedChat !== null && (
        <div
          style={{
            position: "fixed",
            top: "0cm",
            bottom: "3cm",
            right: 0,
            width: "25vw",
            border: "2px solid #ff0303",
            borderRadius: "16px",
            background: "#000000",
            boxShadow:
              "-8px 0 24px rgba(0, 0, 0, 0.18)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <button
            onClick={() =>
              setSelectedChat(null)
            }
            style={{
              alignSelf: "flex-end",
              margin: "10px",
              border: "none",
              background: "transparent",
              color: "#fcfcfc",
              fontSize: "24px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            ×
          </button>

          <div
            className="chat-container"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0
              }}
            >
              <ChatWindow
                chatId={selectedChat}
                refresh={refresh}
              />
            </div>

            <MessageInput
              chatId={selectedChat}
              onMessageSent={() =>
                setRefresh(
                  (prev) => prev + 1
                )
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}