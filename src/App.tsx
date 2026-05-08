import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Formulario1 from "./pages/Formulario1";
import Chats from "./pages/Chats";
import Clientes from "./pages/Clientes";

export default function App() {
  return (
    <BrowserRouter basename="/crmv1">
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/formulario1" element={<Formulario1 />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/clientes" element={<Clientes />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}