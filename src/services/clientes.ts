const API = import.meta.env.VITE_API_URL;

export const getCliente = async (id: string) => {
  const res = await fetch(`${API}/api/clientes/${id}`);
  return res.json();
};

export const deleteContacto = async (id: number) => {
  return fetch(`${API}/api/clientes/contacto/${id}`, {
    method: "DELETE",
  });
};

export const deleteCliente = async (id: string) => {
  return fetch(`${API}/api/clientes/${id}`, {
    method: "DELETE",
  });
};

export const sendTemplate = async (numero: string) => {
  return fetch(`${API}/api/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: numero,
      mode: "template",
    }),
  });
};