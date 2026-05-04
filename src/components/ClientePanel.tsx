import { useState } from "react";
import "../styles/home.css";

import {
  getCliente,
  deleteCliente,
  deleteContacto,
  sendTemplate,
} from "../services/clientes";

const API = import.meta.env.VITE_API_URL;

type Contacto = {
  id_contacto: number;
  nombre: string;
  numero: string;
  categoria?: string;
};

export default function ClientPanel() {
  const [clienteId, setClienteId] = useState("");
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [selectAll, setSelectAll] = useState(false); // 🔥 NUEVO

  /**
   * ===============================
   * BUSCAR CLIENTE
   * ===============================
   */
  const handleSearchClient = async () => {
    if (!clienteId) return;

    setLoading(true);
    const data = await getCliente(clienteId);

    if (data.ok) {
      setContactos(data.contactos);
      setSeleccionados([]);
      setCategoria("");
    }

    setLoading(false);
  };

  /**
   * ===============================
   * BUSCAR POR CATEGORIA
   * ===============================
   */
  const buscarPorCategoria = async (cat: string) => {
    if (!cat) {
      setContactos([]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API}/api/contactos/categoria/${cat}` // 🔥 FIX
      );

      const data = await res.json();

      if (data.ok) {
        setContactos(data.contactos);
        setSeleccionados([]);
        setClienteId("");
        setSelectAll(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * ===============================
   * CHECK INDIVIDUAL
   * ===============================
   */
  const toggleSeleccion = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  /**
   * ===============================
   * 🔥 CHECK TODOS
   * ===============================
   */
  const handleSelectAll = () => {
    if (selectAll) {
      setSeleccionados([]);
    } else {
      setSeleccionados(contactosFiltrados.map((c) => c.id_contacto));
    }

    setSelectAll(!selectAll);
  };

  /**
   * ===============================
   * ELIMINAR CONTACTOS
   * ===============================
   */
  const handleDeleteContact = async () => {
    await Promise.all(
      seleccionados.map(deleteContacto)
    );
    setSeleccionados([]);
    handleSearchClient();
  };

  /**
   * ===============================
   * ELIMINAR CLIENTE
   * ===============================
   */
  const handleDeleteClient = async () => {
    await deleteCliente(clienteId);
    setContactos([]);
    setClienteId("");
  };

  /**
   * ===============================
   * ENVIAR TEMPLATE
   * ===============================
   */
  const handleSendTemplate = async () => {
    const seleccionadosData = contactos.filter((c) =>
      seleccionados.includes(c.id_contacto)
    );

    for (const item of seleccionadosData) {
      await sendTemplate(item.numero);
    }

    alert("Formulario enviado");
  };

  /**
   * ===============================
   * FILTRO TEXTO
   * ===============================
   */
  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.numero.includes(busqueda)
  );

  return (
    <div className="client-panel">
      <h3 className="panel-title">Clientes</h3>

      {/* 🔍 BUSCAR CLIENTE */}
      <input
        className="panel-input"
        placeholder="Buscar por número cliente"
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
      />

      <button onClick={handleSearchClient}>
        {loading ? "Buscando..." : "Buscar"}
      </button>

      <hr />

      {/* 🔎 BUSQUEDA */}
      <input
        className="panel-input"
        placeholder="Buscar por nombre o número"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* 🏷️ CATEGORIAS */}
      <select
        className="panel-input"
        value={categoria}
        onChange={(e) => {
          setCategoria(e.target.value);
          buscarPorCategoria(e.target.value);
        }}
      >
        <option value="">Seleccionar categoría</option>
        <option value="ventas">Ventas</option>
        <option value="socios">Socios</option>
        <option value="vip">VIP</option>
        <option value="cobranza">Cobranza</option>
      </select>

      <hr />

      {/* 🔥 CHECK TODOS */}
      {contactosFiltrados.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />{" "}
          Seleccionar todos
        </div>
      )}

      {/* 📋 LISTA */}
      {contactosFiltrados.map((item) => (
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
          <span className="badge">{item.categoria}</span>
        </div>
      ))}

      {/* 🔥 ACCIONES */}
      {contactos.length > 0 && (
        <>
          <button className="btn-green" onClick={handleSendTemplate}>
            Enviar Seleccionados
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