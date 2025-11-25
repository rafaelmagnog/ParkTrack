import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getClientes, deleteCliente } from "../services/clienteService";
import ClientesTable from "../components/clientes/ClientesTable";
import { CriarClienteModal } from "../components/clientes/CriarClienteModal";
import { EditarClienteModal } from "../components/clientes/EditarClienteModal";
import { useDebounce } from "../hooks/useDebounce";
import type { Cliente } from "../types/cliente";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const ClientesPage: React.FC = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [abrirModalCriar, setAbrirModalCriar] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const carregarClientes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setSnackbar({
        open: true,
        message: "Erro ao buscar clientes.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarClientes();
  }, [carregarClientes]);

  const handleDelete = useCallback(async (id: number) => {
    setDeletingId(id);
    try {
      await deleteCliente(id);
      setClientes((prev) => prev.filter((c) => c.id !== id));
      setSnackbar({
        open: true,
        message: "Cliente removido com sucesso.",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      setSnackbar({
        open: true,
        message: "Erro ao deletar cliente.",
        severity: "error",
      });
    } finally {
      setDeletingId(null);
    }
  }, []);

  const handleOpenEditModal = useCallback((cliente: Cliente) => {
    setClienteEditando(cliente);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setClienteEditando(null);
  }, []);

  const handleSaveCliente = useCallback((clienteAtualizado: Cliente) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === clienteAtualizado.id ? clienteAtualizado : c))
    );
    setSnackbar({
      open: true,
      message: "Cliente atualizado com sucesso.",
      severity: "success",
    });
  }, []);

  const handleSucessoCriarCliente = useCallback((novoCliente: Cliente) => {
    setClientes((prev) => [...prev, novoCliente]);
    setSnackbar({
      open: true,
      message: "Cliente criado com sucesso.",
      severity: "success",
    });
  }, []);

  const clientesFiltrados = useMemo(() => {
    if (!debouncedSearchTerm) return clientes;
    const termo = debouncedSearchTerm.toLowerCase();
    return clientes.filter((cliente) => {
      return (
        cliente.nome.toLowerCase().includes(termo) ||
        cliente.cpf.includes(debouncedSearchTerm) ||
        cliente.telefone.includes(debouncedSearchTerm)
      );
    });
  }, [clientes, debouncedSearchTerm]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Paper
        elevation={3}
        sx={(theme) => ({
          width: "100%",
          maxWidth: 1000,
          p: 3,
          position: "relative",
          bgcolor:
            theme.palette.mode === "dark" ? "#242424" : "background.paper",
          color: theme.palette.text.primary,
          borderRadius: 2,
        })}
      >
        <IconButton
          aria-label="voltar"
          onClick={() => navigate("/")}
          size="small"
          sx={{ position: "absolute", left: 16, top: 16 }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight={600}>
            Clientes
          </Typography>
          <Chip
            label={`${clientesFiltrados.length} cliente(s)`}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
          gap={2}
        >
          <TextField
            placeholder="Buscar por nome, CPF ou telefone..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAbrirModalCriar(true)}
          >
            Novo Cliente
          </Button>
        </Box>

        <ClientesTable
          clientes={clientesFiltrados}
          loading={loading}
          deletingId={deletingId}
          onEdit={handleOpenEditModal}
          onDelete={handleDelete}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>

      <EditarClienteModal
        open={clienteEditando !== null}
        cliente={clienteEditando}
        onClose={handleCloseEditModal}
        onSave={handleSaveCliente}
      />

      <CriarClienteModal
        open={abrirModalCriar}
        onClose={() => setAbrirModalCriar(false)}
        onSuccess={handleSucessoCriarCliente}
      />
    </Box>
  );
};

export default ClientesPage;
