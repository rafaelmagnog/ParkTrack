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
  Typography,
} from "@mui/material";
import { updateEstacionamento } from "../../services/estacionamentoService";
import { validateUpdateEstacionamento } from "../../schemas/validation";
import type { Estacionamento } from "../../types/estacionamento";

interface EditarEstacionamentoModalProps {
  open: boolean;
  estacionamento: Estacionamento | null;
  onClose: () => void;
  onSave: (estacionamento: Estacionamento) => void;
}

const PRECO_POR_HORA = 10;

const calcularValor = (horaEntrada: string, horaSaida: string): number => {
  const entrada = new Date(horaEntrada);
  const saida = new Date(horaSaida);
  const diffMs = saida.getTime() - entrada.getTime();
  const diffHoras = diffMs / (1000 * 60 * 60);
  const horasCobranca = Math.max(1, Math.ceil(diffHoras));
  return horasCobranca * PRECO_POR_HORA;
};

const toLocalDateTimeString = (date: Date): string => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export const EditarEstacionamentoModal: React.FC<
  EditarEstacionamentoModalProps
> = ({ open, estacionamento, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    horaSaida: "",
    valor: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (estacionamento && open) {
      const now = new Date();
      const horaSaida = estacionamento.horaSaida
        ? toLocalDateTimeString(new Date(estacionamento.horaSaida))
        : toLocalDateTimeString(now);

      const valor = estacionamento.horaSaida
        ? estacionamento.valor ||
          calcularValor(estacionamento.horaEntrada, estacionamento.horaSaida)
        : calcularValor(estacionamento.horaEntrada, now.toISOString());

      setFormData({ horaSaida, valor });
      setErrors({});
    }
  }, [estacionamento, open]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "horaSaida" && estacionamento) {
        const novoValor = calcularValor(estacionamento.horaEntrada, value);
        setFormData((prev) => ({
          ...prev,
          horaSaida: value,
          valor: novoValor,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: name === "valor" ? Number(value) : value,
        }));
      }
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [estacionamento]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!estacionamento) return;

      // Validação frontend: horaSaida >= horaEntrada (ignorando segundos)
      if (formData.horaSaida) {
        const horaEntrada = new Date(estacionamento.horaEntrada);
        const horaSaida = new Date(formData.horaSaida);
        // Zerar segundos e milissegundos para comparação justa
        horaEntrada.setSeconds(0, 0);
        horaSaida.setSeconds(0, 0);
        if (horaSaida < horaEntrada) {
          setErrors({
            horaSaida: "Hora de saída deve ser posterior à hora de entrada",
          });
          return;
        }
      }

      const dataToValidate = {
        horaSaida: formData.horaSaida
          ? new Date(formData.horaSaida).toISOString()
          : undefined,
        valor: formData.valor,
      };

      const validation = validateUpdateEstacionamento(dataToValidate);

      if (!validation.success) {
        setErrors(validation.errors);
        return;
      }

      setSalvando(true);

      try {
        const estacionamentoAtualizado = await updateEstacionamento(
          estacionamento.id,
          validation.data
        );
        onSave(estacionamentoAtualizado);
        onClose();
      } catch (error: any) {
        console.error("Erro ao atualizar estacionamento:", error);
        const apiMessage = error.response?.data?.message;
        if (apiMessage?.includes("saída")) {
          setErrors({ horaSaida: apiMessage });
        } else {
          setErrors({
            valor: apiMessage || "Erro ao atualizar. Tente novamente.",
          });
        }
      } finally {
        setSalvando(false);
      }
    },
    [estacionamento, formData, onSave, onClose]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {estacionamento?.horaSaida
          ? "Editar Estacionamento"
          : "Registrar Saída"}
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          {estacionamento && (
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary">
                Veículo:{" "}
                {estacionamento.veiculo?.placa ||
                  `ID: ${estacionamento.veiculoId}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Entrada:{" "}
                {new Date(estacionamento.horaEntrada).toLocaleString("pt-BR")}
              </Typography>
            </Box>
          )}
          <TextField
            label="Data/Hora de Saída"
            name="horaSaida"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={formData.horaSaida}
            onChange={handleInputChange}
            error={!!errors.horaSaida}
            helperText={errors.horaSaida}
            disabled={salvando}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Valor (R$)"
            name="valor"
            type="number"
            fullWidth
            margin="normal"
            value={formData.valor}
            onChange={handleInputChange}
            error={!!errors.valor}
            helperText={errors.valor || `Preço: R$ ${PRECO_POR_HORA},00/hora`}
            disabled={salvando}
            inputProps={{ min: 0, step: 0.01 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={salvando}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            disabled={salvando}
          >
            {salvando ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditarEstacionamentoModal;
