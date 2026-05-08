// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Header />

        <div className="content">
          <Outlet /> {/* 🔥 AQUÍ SE RENDERIZAN LAS PÁGINAS */}
        </div>
      </div>
    </div>
  );
}