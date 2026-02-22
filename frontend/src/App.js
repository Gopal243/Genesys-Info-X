import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import TechnologyPage from "./pages/TechnologyPage";
import HealthcarePage from "./pages/HealthcarePage";
import SemiconductorPage from "./pages/SemiconductorPage";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    // allow layout to settle
    window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/healthcare" element={<HealthcarePage />} />
        <Route path="/semiconductors" element={<SemiconductorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
