// src/components/Card.tsx
export default function Card({ title, value }: any) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}