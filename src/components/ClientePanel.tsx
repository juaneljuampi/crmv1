import { useState, useEffect } from "react";
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
};

type Cliente = {
  id_cliente: string;
  categoria: string;
};

export default function ClientPanel() {
  const [clienteId, setClienteId] = useState("");
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [clientesCategoria, setClientesCategoria] = useState<Cliente[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);

  /**
   * ===============================
   * CARGAR CATEGORIAS
   * ===============================
   */
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const res = await fetch(`${API}/api/categorias`);
        const data = await res.json();

        if (data.ok) {
          setCategorias(
            data.categorias.map((c: any) => c.categoria)
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    cargarCategorias();
  }, []);

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
    }

    setLoading(false);
  };

  /**
   * ===============================
   * BUSCAR CLIENTES POR CATEGORIA
   * ===============================
   */
  const buscarPorCategoria = async () => {
    if (!categoria) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${API}/api/clientes/categoria/${categoria}`
      );

      const data = await res.json();

      if (data.ok) {
        setClientesCategoria(data.clientes);
        setContactos([]);
        setSeleccionados([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * ===============================
   * ENVIAR A TODOS DE LA CATEGORIA
   * ===============================
   */
  const enviarATodosCategoria = async () => {
    if (clientesCategoria.length === 0) {
      alert("No hay clientes en esta categoría");
      return;
    }

    if (!confirm(`Enviar a ${clientesCategoria.length} clientes?`)) return;

    try {
      for (const cliente of clientesCategoria) {
        // 🔥 obtenemos contactos de cada cliente
        const data = await getCliente(cliente.id_cliente);

        if (data.ok) {
          for (const contacto of data.contactos) {
            await sendTemplate(contacto.numero);
          }
        }
      }

      alert("Formulario enviado a toda la categoría");
    } catch (error) {
      console.log(error);
      alert("Error al enviar");
    }
  };

  /**
   * ===============================
   * CHECKBOX
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
   * ENVIAR TEMPLATE (seleccionados)
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

      {/* 🔎 BUSCADOR */}
      <input
        className="panel-input"
        placeholder="Buscar por nombre o número"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* 🏷️ CATEGORIA */}
      <select
        className="panel-input"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Filtrar por categoría</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button onClick={buscarPorCategoria}>
        Buscar por categoría
      </button>

      {/* 🔥 BOTON NUEVO */}
      {clientesCategoria.length > 0 && (
        <button
          className="btn-green"
          onClick={enviarATodosCategoria}
        >
          Enviar a TODOS de la categoría
        </button>
      )}

      <hr />

      {/* 📋 CONTACTOS */}
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
        </div>
      ))}

      {/* 🔥 ACCIONES */}
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