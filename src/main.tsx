import React, { Suspense } from "react"; // Import Suspense
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import './i18n'; // Import i18n configuration

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider> {/* Wrap with HelmetProvider */}
      <BrowserRouter basename={basename}>
        <Suspense fallback="loading...">
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
