import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import {
  createEstacionamento,
  updateEstacionamento,
} from "../../services/estacionamentoService";
import { getVeiculos } from "../../services/veiculoService";
import { validateCreateEstacionamento } from "../../schemas/validation";
import type { Estacionamento } from "../../types/estacionamento";
import type { Veiculo } from "../../types/veiculo";
import { ConfirmarFinalizarModal } from "./ConfirmarFinalizarModal";

interface CriarEstacionamentoModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (estacionamento: Estacionamento) => void;
  onEstacionamentoFinalizado?: (id: number) => void;
}

export const CriarEstacionamentoModal: React.FC<
  CriarEstacionamentoModalProps
> = ({ open, onClose, onSuccess, onEstacionamentoFinalizado }) => {
  const [veiculoId, setVeiculoId] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loadingVeiculos, setLoadingVeiculos] = useState(false);

  // Estado para modal de confirmação
  const [confirmarModal, setConfirmarModal] = useState(false);
  const [estacionamentoAtivoId, setEstacionamentoAtivoId] = useState<
    number | null
  >(null);
  const [placaVeiculoAtivo, setPlacaVeiculoAtivo] = useState("");
  const [finalizando, setFinalizando] = useState(false);

  useEffect(() => {
    if (open) {
      setLoadingVeiculos(true);
      getVeiculos()
        .then(setVeiculos)
        .catch((err) => console.error("Erro ao carregar veículos:", err))
        .finally(() => setLoadingVeiculos(false));
    }
  }, [open]);

  const handleClose = useCallback(() => {
    setVeiculoId(0);
    setErrors({});
    setConfirmarModal(false);
    setEstacionamentoAtivoId(null);
    setPlacaVeiculoAtivo("");
    onClose();
  }, [onClose]);

  const registrarNovaEntrada = useCallback(async () => {
    const validation = validateCreateEstacionamento({ veiculoId });
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setSalvando(true);
    try {
      const novoEstacionamento = await createEstacionamento(validation.data);
      onSuccess(novoEstacionamento);
      handleClose();
    } catch (error: any) {
      console.error("Erro ao criar estacionamento:", error);
      const apiMessage = error.response?.data?.message;
      const estacionamentoAtivoIdResp =
        error.response?.data?.estacionamentoAtivoId;

      if (
        apiMessage?.includes("já está estacionado") &&
        estacionamentoAtivoIdResp
      ) {
        const veiculoSelecionado = veiculos.find((v) => v.id === veiculoId);
        setPlacaVeiculoAtivo(veiculoSelecionado?.placa || "");
        setEstacionamentoAtivoId(estacionamentoAtivoIdResp);
        setConfirmarModal(true);
      } else {
        setErrors({
          veiculoId:
            apiMessage || "Erro ao registrar entrada. Tente novamente.",
        });
      }
    } finally {
      setSalvando(false);
    }
  }, [veiculoId, veiculos, onSuccess, handleClose]);

  const handleConfirmarFinalizar = useCallback(async () => {
    if (!estacionamentoAtivoId) return;

    setFinalizando(true);
    try {
      // Finalizar estacionamento anterior
      const now = new Date().toISOString();
      await updateEstacionamento(estacionamentoAtivoId, {
        horaSaida: now,
        valor: 10, // Valor mínimo
      });

      if (onEstacionamentoFinalizado) {
        onEstacionamentoFinalizado(estacionamentoAtivoId);
      }

      setConfirmarModal(false);
      setEstacionamentoAtivoId(null);

      // Registrar nova entrada
      await registrarNovaEntrada();
    } catch (error) {
      console.error("Erro ao finalizar estacionamento:", error);
      setErrors({
        veiculoId:
          "Erro ao finalizar estacionamento anterior. Tente novamente.",
      });
      setConfirmarModal(false);
    } finally {
      setFinalizando(false);
    }
  }, [estacionamentoAtivoId, onEstacionamentoFinalizado, registrarNovaEntrada]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await registrarNovaEntrada();
    },
    [registrarNovaEntrada]
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Registrar Entrada</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            select
            label="Veículo"
            name="veiculoId"
            fullWidth
            margin="normal"
            value={veiculoId || ""}
            onChange={(e) => {
              setVeiculoId(Number(e.target.value));
              setErrors({});
            }}
            error={!!errors.veiculoId}
            helperText={errors.veiculoId}
            disabled={salvando || loadingVeiculos}
          >
            <MenuItem value="">
              {loadingVeiculos ? "Carregando..." : "Selecione um veículo"}
            </MenuItem>
            {veiculos.map((veiculo) => (
              <MenuItem key={veiculo.id} value={veiculo.id}>
                {veiculo.placa} - {veiculo.modelo} ({veiculo.cor})
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={salvando}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={salvando}
          >
            {salvando ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Registrar Entrada"
            )}
          </Button>
        </DialogActions>
      </Box>

      <ConfirmarFinalizarModal
        open={confirmarModal}
        placa={placaVeiculoAtivo}
        loading={finalizando}
        onConfirm={handleConfirmarFinalizar}
        onCancel={() => {
          setConfirmarModal(false);
          setEstacionamentoAtivoId(null);
        }}
      />
    </Dialog>
  );
};

export default CriarEstacionamentoModal;
