import { useState } from "react";
import "../styles/dashboard.css";

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
  const [categorias, setCategorias] = useState<string[]>([
    "ventas",
    "RRHH",
    "Servicio al cliente",
    "Contabilidad",
  ]);
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

  const handleAddCategoria = () => {
    const nuevaCategoria = prompt("Nueva categoría")?.trim();

    if (!nuevaCategoria) return;
    if (categorias.includes(nuevaCategoria)) return;

    setCategorias((prev) => [...prev, nuevaCategoria]);
  };

  const handleDeleteCategoria = () => {
    const categoriaAEliminar = prompt("Categoría a eliminar")?.trim();

    if (!categoriaAEliminar) return;

    setCategorias((prev) => prev.filter((item) => item !== categoriaAEliminar));

    if (categoria === categoriaAEliminar) {
      setCategoria("");
    }
  };

  const handleEditCategoria = () => {
    const categoriaAnterior = prompt("Categoría a editar")?.trim();
    if (!categoriaAnterior || !categorias.includes(categoriaAnterior)) return;

    const nuevaCategoria = prompt("Nuevo nombre de categoría")?.trim();
    if (!nuevaCategoria || categorias.includes(nuevaCategoria)) return;

    setCategorias((prev) =>
      prev.map((item) => (item === categoriaAnterior ? nuevaCategoria : item))
    );

    if (categoria === categoriaAnterior) {
      setCategoria(nuevaCategoria);
    }
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
  <div className="panel">
    <h3 className="panel-title">Gestión de Clientes</h3>

    {/* 🔍 FILTROS */}
    <div className="filters">
      <input
        placeholder="Número cliente"
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
      />

      <button onClick={handleSearchClient}>
        {loading ? "..." : "Buscar"}
      </button>

      <input
        placeholder="Buscar contacto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <select
        value={categoria}
        onChange={(e) => {
          setCategoria(e.target.value);
          buscarPorCategoria(e.target.value);
        }}
      >
        <option value="">Categoría</option>
        <option value="ventas">Ventas</option>
        <option value="RRHH">RRHH</option>
        <option value="Servicio al cliente">Servicio al cliente</option>
        <option value="Contabilidad">Contabilidad</option>
      </select>

      <button onClick={handleAddCategoria}>Agregar categoría</button>
      <button onClick={handleDeleteCategoria}>Eliminar categoría</button>
      <button onClick={handleEditCategoria}>Editar categoría</button>
    </div>

    {/* 🔥 SELECT ALL */}
    {contactosFiltrados.length > 0 && (
      <div className="select-all">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <span>Seleccionar todos</span>
      </div>
    )}

    {/* 📋 TABLA */}
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Número</th>
          <th>Categoría</th>
        </tr>
      </thead>

      <tbody>
        {contactosFiltrados.map((item) => (
          <tr key={item.id_contacto}>
            <td>
              <input
                type="checkbox"
                checked={seleccionados.includes(item.id_contacto)}
                onChange={() => toggleSeleccion(item.id_contacto)}
                
              />
            </td>
            <td>{item.nombre}</td>
            <td>{item.numero}</td>
            <td>
              <span className="badge">
                {item.categoria}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* 🔥 BOTONES */}
    {contactos.length > 0 && (
      <div className="actions">
        <button className="btn-green" onClick={handleSendTemplate}>
          Enviar
        </button>

        <button className="btn-orange" onClick={handleDeleteContact}>
          Eliminar
        </button>

        <button className="btn-red" onClick={handleDeleteClient}>
          Eliminar Cliente
        </button>

        <button className="btn-blue" onClick={handleSendTemplate}>
          Enviar formulario personalizado
        </button>
        
      </div>
    )}
  </div>
  );
}