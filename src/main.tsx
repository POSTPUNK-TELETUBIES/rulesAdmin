import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { reactQueryClient } from "./lib/modules/reactQuery.ts";
import { TourProvider } from "@reactour/tour";
import "./index.css";

import hotkeys from "hotkeys-js";
import { setOpenMenu } from "./lib/observers/index.ts";
import { Typography } from "@mui/material";

hotkeys("ctrl+m", (event) => {
  event.preventDefault();

  setOpenMenu(true);
});

//TODO: pasar steps a configuracion
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TourProvider
      steps={[
        {
          selector: ".language",
          content:
            "Seleciona un lenguaje primero para que se carguen los perfiles",
        },
        {
          selector: ".mainFilters",
          content:
            "Ahora procede a seleccionar el perfil q pertenece al lenguaje",
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
        {
          selector: ".dragableMenu",
          content:
            "Aqui se encuentran las opciones de descarga y guardado, el boton es arrastable a cualquier lugar",
        },
        {
          selector: ".dragableMenu",
          content: (
            <Typography>
              'Puedes abrir el menu con <kbd>ctrl</kbd> + <kbd>m</kbd>
            </Typography>
          ),
        },
      ]}
    >
      <QueryClientProvider client={reactQueryClient}>
        <App />
      </QueryClientProvider>
    </TourProvider>
  </React.StrictMode>
);
