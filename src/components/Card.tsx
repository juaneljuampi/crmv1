// src/components/Card.tsx
import "../styles/dashboard.css";
export default function Card({ title, value }: any) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}