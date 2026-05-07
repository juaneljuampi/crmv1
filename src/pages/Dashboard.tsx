import Card from "../components/Card";


export default function Dashboard() {
  return (
    <div>
      {/* CARDS */}
      <div className="dashboard">
        <Card title="Clientes" value="120" />
        <Card title="Categorías" value="4" />
        <Card title="Mensajes" value="530" />
      </div>

      {/* PANEL */}
      <div className="panel">
        <h3>Gestión de Clientes</h3>
        <>
        </>
      </div>
    </div>
  );
}