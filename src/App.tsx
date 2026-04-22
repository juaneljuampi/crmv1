import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Formulario1 from "./pages/Formulario1";

function App() {
  return (
    <BrowserRouter basename="/crmv1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario1" element={<Formulario1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;