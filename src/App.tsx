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
import { HashRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) {
    return <Login onLogin={() => setIsAuth(true)} />;
  }

  return (
    <HashRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/mensajes" element={<Mensajes />} />
          <Route path="/formulario1" element={<Formulario1 />} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
}