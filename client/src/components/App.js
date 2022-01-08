import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Reportes } from "../pages/Reportes";
import { Ventas } from "../pages/Ventas";
import { Precios } from "../pages/Precios";
import { NavBar } from "./NavBar";

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Ventas />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/precios" element={<Precios />} />
        </Routes>
      </div>
    </Router>
  );
}

