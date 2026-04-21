import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />     {/* 🔥 principal */}
        <Route path="/chat" element={<Home />} /> {/* tu CRM/chat */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;