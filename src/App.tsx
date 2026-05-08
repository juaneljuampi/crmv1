import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import "./styles/dashboard.css";
import Chats from "./pages/Chats";

import Dashboard from "./pages/Dashboard";
import Formulario1 from "./pages/Formulario1";
import Clientes from "./pages/Clientes";

export default function App() {
  const [page, setPage] = useState("dashboard");

  /**
   * =========================
   * 🔥 LEER URL AL CARGAR
   * =========================
   */
  useEffect(() => {
    const hash = window.location.hash.replace("#/", "");

    if (hash === "formulario1") {
      setPage("formulario1");
    } else {
      setPage("dashboard");
    }
  }, []);

  /**
   * =========================
   * 🔥 ACTUALIZAR URL
   * =========================
   */
  useEffect(() => {
    window.location.hash = page;
  }, [page]);

  /**
   * =========================
   * RENDER
   * =========================
   */
  return (
    <MainLayout setPage={setPage}>
      {page === "dashboard" && <Dashboard />}
      {page === "chats" && <Chats/>}
      {page === "clientes" && <Clientes />}
      {page === "formulario1" && <Formulario1 />}
    </MainLayout>
  );
}