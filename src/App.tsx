import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Clientes from "./pages/Clientes";
import MainLayout from "./layouts/MainLayout";
import "./styles/dashboard.css";

import Categorias from "./pages/Categorias";
import Mensajes from "./pages/Mensajes";
import Dashboard from "./pages/Dashboard";
import Chats from "./pages/Chats";
import Formulario1 from "./pages/Formulario1";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [page, setPage] = useState("dashboard");

  /**
   * =========================
   * 🔥 LEER URL AL CARGAR
   * =========================
   */
  useEffect(() => {
    const path = window.location.pathname;

    if (path.includes("formulario1")) {
      setPage("formulario1");
    } else if (path.includes("chats")) {
      setPage("chats");
    } else if (path.includes("clientes")) {
      setPage("clientes");
    } else if (path.includes("categorias")) {
      setPage("categorias");
    } else if (path.includes("mensajes")) {
      setPage("mensajes");
    } else {
      setPage("dashboard");
    }
  }, []);

  /**
   * =========================
   * 🔥 CAMBIAR URL CUANDO CAMBIA PAGE
   * =========================
   */
  useEffect(() => {
    const base = "/crmv1/";

    if (page === "dashboard") {
      window.history.pushState({}, "", base);
    } else {
      window.history.pushState({}, "", base + page);
    }
  }, [page]);

  /**
   * =========================
   * LOGIN
   * =========================
   */
  if (!isAuth) {
    return <Login onLogin={() => setIsAuth(true)} />;
  }

  /**
   * =========================
   * RENDER
   * =========================
   */
  return (
    <MainLayout setPage={setPage}>
      {page === "dashboard" && <Dashboard />}
      {page === "chats" && <Chats />}
      {page === "clientes" && <Clientes />}
      {page === "categorias" && <Categorias />}
      {page === "mensajes" && <Mensajes />}
      {page === "formulario1" && <Formulario1 />}
    </MainLayout>
  );
}