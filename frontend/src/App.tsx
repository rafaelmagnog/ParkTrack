/**
 * Componente principal da aplicação ParkTrack
 *
 * Gerencia o tema (claro/escuro) e define as rotas da aplicação.
 * O tema escolhido é persistido no localStorage.
 */

import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import {
  HomePage,
  ClientesPage,
  VeiculosPage,
  EstacionamentosPage,
} from "./pages";
import ThemeToggleFloating from "./components/ThemeToggleFloating";
import "./App.css";

type ThemeMode = "light" | "dark";

function App() {
  // Recupera tema salvo ou usa light como padrão
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("themeMode");
    return (saved as ThemeMode) || "light";
  });

  // Cria o tema do MUI - memorizado para evitar recriação desnecessária
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // Cores de fundo customizadas para cada modo
          ...(mode === "dark"
            ? {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
              }
            : {
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
          borderRadius: 8,
        },
        // Customizações de componentes MUI
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none", // Sem uppercase automático
                fontWeight: 600,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [mode]
  );

  // Alterna entre tema claro e escuro
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS do MUI */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/veiculos" element={<VeiculosPage />} />
          <Route path="/estacionamentos" element={<EstacionamentosPage />} />
        </Routes>
        {/* Botão flutuante para alternar tema */}
        <ThemeToggleFloating mode={mode} toggleColorMode={toggleTheme} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
