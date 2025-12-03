/**
 * Botão flutuante para alternar tema claro/escuro
 *
 * Fica fixo na parte inferior central da tela.
 * Exibe o modo atual e ícone correspondente.
 */

import React from "react";
import { Tooltip, Paper, Typography } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface ThemeToggleFloatingProps {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

const ThemeToggleFloating: React.FC<ThemeToggleFloatingProps> = ({
  toggleColorMode,
  mode,
}) => {
  return (
    <Tooltip title={mode === "dark" ? "Modo claro" : "Modo escuro"}>
      <Paper
        elevation={6}
        onClick={toggleColorMode}
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: 999,
          px: 2,
          py: 0.75,
          display: "flex",
          alignItems: "center",
          gap: 1,
          zIndex: 1400,
          cursor: "pointer",
          transition: "opacity 0.2s",
          "&:hover": {
            opacity: 0.85,
          },
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {mode === "dark" ? "Escuro" : "Claro"}
        </Typography>
        {/* Ícone muda conforme o tema atual */}
        {mode === "dark" ? (
          <Brightness7 fontSize="small" color="action" />
        ) : (
          <Brightness4 fontSize="small" color="action" />
        )}
      </Paper>
    </Tooltip>
  );
};

export default ThemeToggleFloating;
