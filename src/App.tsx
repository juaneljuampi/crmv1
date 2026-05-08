import { useState } from "react";
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

  if (!isAuth) {
    return <Login onLogin={() => setIsAuth(true)} />;
  }

  return (
    <MainLayout setPage={setPage}>
      {page === "dashboard" && <Dashboard />}
      {page === "chats" && <Chats/>}
      {page === "clientes" && <Clientes />}
      {page === "categorias" && <Categorias />}
      {page === "mensajes" && <Mensajes />}
      {page === "formulario1" && <Formulario1 />}
    </MainLayout>
  );
}