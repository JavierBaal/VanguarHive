import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import KairosJuristaLandingPage from "./components/KairosJuristaLandingPage";
import TehorIALandingPage from "./components/TehorIALandingPage";
import AboutSection from "./components/AboutSection"; // Importar AboutSection
import routes from "tempo-routes";
import { Toaster } from "@/components/ui/toaster"; // Importar Toaster

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/kairos-jurista"
            element={<KairosJuristaLandingPage />}
          />
          <Route path="/tehoria" element={<TehorIALandingPage />} />
          <Route path="/about" element={<AboutSection />} /> {/* Añadir ruta /about */}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Toaster /> {/* Añadir Toaster aquí */}
      </>
    </Suspense>
  );
}

export default App;
