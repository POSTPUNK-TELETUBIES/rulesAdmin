import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { reactQueryClient } from "./lib/modules/reactQuery.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={reactQueryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
