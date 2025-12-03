/**
 * Ponto de entrada da aplicação React
 *
 * Renderiza o App dentro do StrictMode, que ajuda a identificar
 * problemas potenciais durante o desenvolvimento.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Busca o elemento root definido no index.html
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// React 18+ usa createRoot ao invés de ReactDOM.render
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
