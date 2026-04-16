import { io } from "socket.io-client";

const socket = io("https://backend-api-whatsapp-crm.onrender.com", {
  transports: ["websocket"],
});

export default socket;