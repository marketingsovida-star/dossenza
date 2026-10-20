import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { GastroPage } from "@/pages/gastro";
import { EnteroPage } from "@/pages/entero";
import { SacPage } from "@/pages/sac";
import { LojaPage } from "@/pages/loja";

/* Rola para o topo ao trocar de rota; respeita âncoras (#produtos, #faq...). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gastro" element={<GastroPage />} />
        <Route path="/entero" element={<EnteroPage />} />
        <Route path="/sac" element={<SacPage />} />
        <Route path="/loja" element={<LojaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
