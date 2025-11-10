import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../src/pages/login";
import Home from "./pages/home";
import ModeloPadrao from "./pages/modeloPadrao";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/modeloPadrao" element={<ModeloPadrao />} />
      </Routes>
    </BrowserRouter>
  );
}
