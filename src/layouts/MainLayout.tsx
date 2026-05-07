// src/layouts/MainLayout.tsx
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ children, setPage }: any) {
  return (
    <div className="layout">
      <Sidebar setPage={setPage} />

      <div className="main">
        <Header />

        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}