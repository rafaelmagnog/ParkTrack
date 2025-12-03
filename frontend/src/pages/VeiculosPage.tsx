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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getVeiculos, deleteVeiculo } from "../services/veiculoService";
import VeiculosTable from "../components/veiculos/VeiculosTable";
import { CriarVeiculoModal } from "../components/veiculos/CriarVeiculoModal";
import { EditarVeiculoModal } from "../components/veiculos/EditarVeiculoModal";
import { ConfirmarExclusaoVeiculoModal } from "../components/veiculos/ConfirmarExclusaoVeiculoModal";
import { useDebounce } from "../hooks/useDebounce";
import type { Veiculo } from "../types/veiculo";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

interface EstacionamentoVinculado {
  id: number;
  horaEntrada: string;
  horaSaida: string | null;
  valor: number | null;
}

interface VeiculoInfo {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  clienteNome: string;
}

interface ConfirmacaoExclusao {
  veiculo: VeiculoInfo;
  estacionamentos: EstacionamentoVinculado[];
}

const VeiculosPage: React.FC = () => {
  const navigate = useNavigate();
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [veiculoEditando, setVeiculoEditando] = useState<Veiculo | null>(null);
  const [abrirModalCriar, setAbrirModalCriar] = useState(false);
  const [confirmacaoExclusao, setConfirmacaoExclusao] =
    useState<ConfirmacaoExclusao | null>(null);
  const [loadingExclusao, setLoadingExclusao] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const carregarVeiculos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getVeiculos();
      setVeiculos(data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      setSnackbar({
        open: true,
        message: "Erro ao buscar veículos.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarVeiculos();
  }, [carregarVeiculos]);

  const handleDelete = useCallback(async (id: number) => {
    setDeletingId(id);
    try {
      await deleteVeiculo(id);
      setVeiculos((prev) => prev.filter((v) => v.id !== id));
      setSnackbar({
        open: true,
        message: "Veículo removido com sucesso.",
        severity: "success",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        const { veiculo, estacionamentos } = error.response.data;
        setConfirmacaoExclusao({ veiculo, estacionamentos });
      } else {
        console.error("Erro ao deletar veículo:", error);
        setSnackbar({
          open: true,
          message: "Erro ao deletar veículo.",
          severity: "error",
        });
      }
    } finally {
      setDeletingId(null);
    }
  }, []);

  const handleConfirmDeleteAll = useCallback(async () => {
    if (!confirmacaoExclusao) return;

    setLoadingExclusao(true);
    try {
      await deleteVeiculo(confirmacaoExclusao.veiculo.id, false);
      setVeiculos((prev) =>
        prev.filter((v) => v.id !== confirmacaoExclusao.veiculo.id)
      );
      setSnackbar({
        open: true,
        message: `Veículo e ${confirmacaoExclusao.estacionamentos.length} estacionamento(s) removidos.`,
        severity: "success",
      });
      setConfirmacaoExclusao(null);
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      setSnackbar({
        open: true,
        message: "Erro ao excluir veículo.",
        severity: "error",
      });
    } finally {
      setLoadingExclusao(false);
    }
  }, [confirmacaoExclusao]);

  const handleConfirmKeepHistory = useCallback(async () => {
    if (!confirmacaoExclusao) return;

    setLoadingExclusao(true);
    try {
      await deleteVeiculo(confirmacaoExclusao.veiculo.id, true);
      setVeiculos((prev) =>
        prev.filter((v) => v.id !== confirmacaoExclusao.veiculo.id)
      );
      setSnackbar({
        open: true,
        message: `Veículo removido. Histórico de ${confirmacaoExclusao.estacionamentos.length} estacionamento(s) preservado.`,
        severity: "success",
      });
      setConfirmacaoExclusao(null);
    } catch (error) {
      console.error("Erro ao excluir veículo mantendo histórico:", error);
      setSnackbar({
        open: true,
        message: "Erro ao excluir veículo.",
        severity: "error",
      });
    } finally {
      setLoadingExclusao(false);
    }
  }, [confirmacaoExclusao]);

  const handleOpenEditModal = useCallback((veiculo: Veiculo) => {
    setVeiculoEditando(veiculo);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setVeiculoEditando(null);
  }, []);

  const handleSaveVeiculo = useCallback((veiculoAtualizado: Veiculo) => {
    setVeiculos((prev) =>
      prev.map((v) => (v.id === veiculoAtualizado.id ? veiculoAtualizado : v))
    );
    setSnackbar({
      open: true,
      message: "Veículo atualizado com sucesso.",
      severity: "success",
    });
  }, []);

  const handleSucessoCriarVeiculo = useCallback((novoVeiculo: Veiculo) => {
    setVeiculos((prev) => [...prev, novoVeiculo]);
    setSnackbar({
      open: true,
      message: "Veículo criado com sucesso.",
      severity: "success",
    });
  }, []);

  const veiculosFiltrados = useMemo(() => {
    if (!debouncedSearchTerm) return veiculos;
    const termo = debouncedSearchTerm.toLowerCase();
    return veiculos.filter((veiculo) => {
      return (
        veiculo.placa.toLowerCase().includes(termo) ||
        veiculo.modelo.toLowerCase().includes(termo) ||
        veiculo.cor.toLowerCase().includes(termo)
      );
    });
  }, [veiculos, debouncedSearchTerm]);

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
          maxWidth: 1100,
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
            Veículos
          </Typography>
          <Chip
            label={`${veiculosFiltrados.length} veículo(s)`}
            size="small"
            color="secondary"
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
            placeholder="Buscar por placa, modelo ou cor..."
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
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setAbrirModalCriar(true)}
          >
            Novo Veículo
          </Button>
        </Box>

        <VeiculosTable
          veiculos={veiculosFiltrados}
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

      <EditarVeiculoModal
        open={veiculoEditando !== null}
        veiculo={veiculoEditando}
        onClose={handleCloseEditModal}
        onSave={handleSaveVeiculo}
      />

      <CriarVeiculoModal
        open={abrirModalCriar}
        onClose={() => setAbrirModalCriar(false)}
        onSuccess={handleSucessoCriarVeiculo}
      />

      <ConfirmarExclusaoVeiculoModal
        open={confirmacaoExclusao !== null}
        veiculo={confirmacaoExclusao?.veiculo || null}
        estacionamentos={confirmacaoExclusao?.estacionamentos || []}
        loading={loadingExclusao}
        onConfirmDeleteAll={handleConfirmDeleteAll}
        onConfirmKeepHistory={handleConfirmKeepHistory}
        onCancel={() => setConfirmacaoExclusao(null)}
      />
    </Box>
  );
};

export default VeiculosPage;
