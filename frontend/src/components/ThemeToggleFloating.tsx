import React from "react";
import { IconButton, Tooltip, Paper, Typography } from "@mui/material";
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
    <Paper
      elevation={6}
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: 999,
        px: 2,
        py: 0.5,
        display: "flex",
        alignItems: "center",
        gap: 1,
        zIndex: 1400,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {mode === "dark" ? "Escuro" : "Claro"}
      </Typography>
      <Tooltip title={mode === "dark" ? "Modo claro" : "Modo escuro"}>
        <IconButton
          onClick={toggleColorMode}
          size="small"
          aria-label="alternar tema"
        >
          {mode === "dark" ? (
            <Brightness7 fontSize="small" />
          ) : (
            <Brightness4 fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default ThemeToggleFloating;
