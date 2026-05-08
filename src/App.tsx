import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Chats from "./pages/Chats";
import Clientes from "./pages/Clientes";
import Formulario1 from "./pages/Formulario1";

export default function App() {
  return (
    <BrowserRouter basename="/crmv1">
      <Routes>

        {/* 🔥 RUTAS CON DASHBOARD */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="chats" element={<Chats />} />
          <Route path="clientes" element={<Clientes />} />
          
          
        </Route>

        {/* 🔥 FORMULARIO FUERA DEL DASHBOARD */}
        <Route path="/formulario1" element={<Formulario1 />} />

      </Routes>
    </BrowserRouter>
  );
}