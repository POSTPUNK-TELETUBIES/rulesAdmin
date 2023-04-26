import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { reactQueryClient } from "./lib/modules/reactQuery.ts";
import { TourProvider } from "@reactour/tour";
import "./index.css";

//TODO: pasar steps a configuracion
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TourProvider
      steps={[
        {
          selector: ".mainFilters",
          content: "Selecciona ambos filtros para obtener resultados",
        },
        {
          selector: ".actualState",
          content: "El estado actual en Sonar Qube",
        },
        {
          selector: ".proposedState",
          content:
            "Este estado no hara los cambios inmediatamente, es solo para el reporte",
        },
      ]}
    >
      <QueryClientProvider client={reactQueryClient}>
        <App />
      </QueryClientProvider>
    </TourProvider>
  </React.StrictMode>
);
