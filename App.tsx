import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Servizi from "./pages/Servizi";
import ChiSiamo from "./pages/ChiSiamo";
import Consegne from "./pages/Consegne";
import Contatti from "./pages/Contatti";
import Configuratore from "./pages/Configuratore";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servizi" element={<Servizi />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/consegne" element={<Consegne />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/configuratore" element={<Configuratore />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
