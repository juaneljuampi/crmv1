import { useState } from "react";
import "../styles/home.css";

import {
  getCliente,
  deleteCliente,
  deleteContacto,
  sendTemplate,
} from "../services/clientes";

type Contacto = {
  id_contacto: number;
  nombre: string;
  numero: string;
};

export default function ClientPanel() {
  const [clienteId, setClienteId] = useState("");
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearchClient = async () => {
    if (!clienteId) return;

    setLoading(true);
    const data = await getCliente(clienteId);

    if (data.ok) {
      setContactos(data.contactos);
      setSeleccionados([]);
    }

    setLoading(false);
  };

  const toggleSeleccion = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleDeleteContact = async () => {
    await Promise.all(
      seleccionados.map(deleteContacto)
    );
    setSeleccionados([]);
    handleSearchClient();
  };

  const handleDeleteClient = async () => {
    await deleteCliente(clienteId);
    setContactos([]);
    setClienteId("");
  };

  const handleSendTemplate = async () => {
    const seleccionadosData = contactos.filter((c) =>
      seleccionados.includes(c.id_contacto)
    );

    for (const item of seleccionadosData) {
      await sendTemplate(item.numero);
    }

    alert("Formulario enviado");
  };

  return (
    <div className="client-panel">
      <h3 className="panel-title">Buscar Cliente</h3>

      <input
        className="panel-input"
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
      />

      <button onClick={handleSearchClient}>
        {loading ? "Buscando..." : "Buscar"}
      </button>

      <hr />

      {contactos.map((item) => (
        <div
          key={item.id_contacto}
          className="contact-card"
          onClick={() => toggleSeleccion(item.id_contacto)}
        >
          <input
            type="checkbox"
            checked={seleccionados.includes(item.id_contacto)}
            readOnly
          />
          <div>{item.nombre}</div>
          <small>{item.numero}</small>
        </div>
      ))}

      {contactos.length > 0 && (
        <>
          <button className="btn-green" onClick={handleSendTemplate}>
            Enviar Formulario
          </button>

          <button className="btn-orange" onClick={handleDeleteContact}>
            Eliminar
          </button>

          <button className="btn-red" onClick={handleDeleteClient}>
            Eliminar Cliente
          </button>
        </>
      )}
    </div>
  );
}