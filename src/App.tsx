import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
// Corrected paths using alias
import Home from "@/lib/components/home";
import KairosJuristaLandingPage from "@/lib/components/KairosJuristaLandingPage";
import TehorIALandingPage from "@/lib/components/TehorIALandingPage";
import KairosCreativeLandingPage from "@/lib/components/KairosCreativeLandingPage";
import AboutPage from "@/components/AboutPage"; // This one seems to be in src/components, keep relative? Or move it too? Let's assume it stays for now. Check structure again if error persists.
import { TermsPage } from '@/components/TermsPage'; // Nueva página
import { PrivacyPage } from '@/components/PrivacyPage'; // Nueva página
import { BlogPage } from '@/components/BlogPage'; // Página del Blog
import { BlogPostDetailPage } from '@/components/BlogPostDetailPage'; // Página Detalle Post Blog
import { CookieConsentBanner } from '@/components/CookieConsentBanner'; // Banner de cookies
import routes from "tempo-routes";
import { Toaster } from "@/lib/components/ui/toaster"; // Corrected path for Toaster

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
          <Route path="/kairos-creative" element={<KairosCreativeLandingPage />} /> {/* Añadir ruta */}
          <Route path="/about" element={<AboutPage />} /> {/* Usar AboutPage */}
          <Route path="/terms" element={<TermsPage />} /> {/* Ruta Términos */}
          <Route path="/privacy" element={<PrivacyPage />} /> {/* Ruta Privacidad */}
          <Route path="/blog" element={<BlogPage />} /> {/* Ruta Listado Blog */}
          <Route path="/blog/:slug" element={<BlogPostDetailPage />} /> {/* Ruta Detalle Post Blog */}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Toaster /> {/* Añadir Toaster aquí */}
        <CookieConsentBanner /> {/* Añadir Banner de Cookies */}
      </>
    </Suspense>
  );
}

export default App;
