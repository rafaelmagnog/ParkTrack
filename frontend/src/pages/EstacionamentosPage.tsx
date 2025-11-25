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
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {
  getEstacionamentos,
  deleteEstacionamento,
} from "../services/estacionamentoService";
import EstacionamentosTable from "../components/estacionamentos/EstacionamentosTable";
import { CriarEstacionamentoModal } from "../components/estacionamentos/CriarEstacionamentoModal";
import { EditarEstacionamentoModal } from "../components/estacionamentos/EditarEstacionamentoModal";
import { useDebounce } from "../hooks/useDebounce";
import type { Estacionamento } from "../types/estacionamento";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

type FiltroStatus = "todos" | "ativos" | "finalizados";

const EstacionamentosPage: React.FC = () => {
  const navigate = useNavigate();
  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [estacionamentoEditando, setEstacionamentoEditando] =
    useState<Estacionamento | null>(null);
  const [abrirModalCriar, setAbrirModalCriar] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const carregarEstacionamentos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEstacionamentos();
      setEstacionamentos(data);
    } catch (error) {
      console.error("Erro ao buscar estacionamentos:", error);
      setSnackbar({
        open: true,
        message: "Erro ao buscar estacionamentos.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarEstacionamentos();
  }, [carregarEstacionamentos]);

  const handleDelete = useCallback(async (id: number) => {
    setDeletingId(id);
    try {
      await deleteEstacionamento(id);
      setEstacionamentos((prev) => prev.filter((e) => e.id !== id));
      setSnackbar({
        open: true,
        message: "Estacionamento removido com sucesso.",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao deletar estacionamento:", error);
      setSnackbar({
        open: true,
        message: "Erro ao deletar estacionamento.",
        severity: "error",
      });
    } finally {
      setDeletingId(null);
    }
  }, []);

  const handleOpenEditModal = useCallback((estacionamento: Estacionamento) => {
    setEstacionamentoEditando(estacionamento);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEstacionamentoEditando(null);
  }, []);

  const handleRegistrarSaida = useCallback((estacionamento: Estacionamento) => {
    setEstacionamentoEditando(estacionamento);
  }, []);

  const handleSaveEstacionamento = useCallback(
    (estacionamentoAtualizado: Estacionamento) => {
      setEstacionamentos((prev) =>
        prev.map((e) =>
          e.id === estacionamentoAtualizado.id ? estacionamentoAtualizado : e
        )
      );
      setSnackbar({
        open: true,
        message: "Estacionamento atualizado com sucesso.",
        severity: "success",
      });
    },
    []
  );

  const handleSucessoCriarEstacionamento = useCallback(
    (novoEstacionamento: Estacionamento) => {
      setEstacionamentos((prev) => [novoEstacionamento, ...prev]);
      setSnackbar({
        open: true,
        message: "Entrada registrada com sucesso.",
        severity: "success",
      });
    },
    []
  );

  const handleEstacionamentoFinalizado = useCallback(
    (_idFinalizado: number) => {
      // Atualiza o estacionamento finalizado na lista
      carregarEstacionamentos();
    },
    [carregarEstacionamentos]
  );

  const estacionamentosFiltrados = useMemo(() => {
    let resultado = estacionamentos;

    // Filtro por status
    if (filtroStatus === "ativos") {
      resultado = resultado.filter((e) => !e.horaSaida);
    } else if (filtroStatus === "finalizados") {
      resultado = resultado.filter((e) => e.horaSaida);
    }

    // Filtro por busca
    if (debouncedSearchTerm) {
      const termo = debouncedSearchTerm.toLowerCase();
      resultado = resultado.filter((estacionamento) => {
        return (
          estacionamento.veiculo?.placa?.toLowerCase().includes(termo) ||
          String(estacionamento.veiculoId).includes(termo)
        );
      });
    }

    return resultado;
  }, [estacionamentos, debouncedSearchTerm, filtroStatus]);

  const estatisticas = useMemo(() => {
    const ativos = estacionamentos.filter((e) => !e.horaSaida).length;
    const finalizados = estacionamentos.filter((e) => e.horaSaida).length;
    const faturamentoHoje = estacionamentos
      .filter((e) => {
        if (!e.horaSaida || !e.valor) return false;
        const saida = new Date(e.horaSaida);
        const hoje = new Date();
        return saida.toDateString() === hoje.toDateString();
      })
      .reduce((acc, e) => acc + (e.valor || 0), 0);

    return { ativos, finalizados, faturamentoHoje };
  }, [estacionamentos]);

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
          maxWidth: 1200,
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
            Estacionamento
          </Typography>
          <Box display="flex" justifyContent="center" gap={1} mt={1}>
            <Chip
              label={`${estatisticas.ativos} ativo(s)`}
              size="small"
              color="success"
            />
            <Chip
              label={`${estatisticas.finalizados} finalizado(s)`}
              size="small"
              color="default"
            />
            <Chip
              label={`Hoje: R$ ${estatisticas.faturamentoHoje.toFixed(2)}`}
              size="small"
              color="info"
            />
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
          gap={2}
        >
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              placeholder="Buscar por placa..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              label="Status"
              size="small"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as FiltroStatus)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="ativos">Ativos</MenuItem>
              <MenuItem value="finalizados">Finalizados</MenuItem>
            </TextField>
          </Box>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => setAbrirModalCriar(true)}
          >
            Registrar Entrada
          </Button>
        </Box>

        <EstacionamentosTable
          estacionamentos={estacionamentosFiltrados}
          loading={loading}
          deletingId={deletingId}
          onEdit={handleOpenEditModal}
          onDelete={handleDelete}
          onRegistrarSaida={handleRegistrarSaida}
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

      <EditarEstacionamentoModal
        open={estacionamentoEditando !== null}
        estacionamento={estacionamentoEditando}
        onClose={handleCloseEditModal}
        onSave={handleSaveEstacionamento}
      />

      <CriarEstacionamentoModal
        open={abrirModalCriar}
        onClose={() => setAbrirModalCriar(false)}
        onSuccess={handleSucessoCriarEstacionamento}
        onEstacionamentoFinalizado={handleEstacionamentoFinalizado}
      />
    </Box>
  );
};

export default EstacionamentosPage;
