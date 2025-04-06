import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import KairosJuristaLandingPage from "./components/KairosJuristaLandingPage";
import TehorIALandingPage from "./components/TehorIALandingPage";
import routes from "tempo-routes";

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
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
