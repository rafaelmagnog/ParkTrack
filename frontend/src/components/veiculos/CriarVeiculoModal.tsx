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
import { createVeiculo } from "../../services/veiculoService";
import { getClientes } from "../../services/clienteService";
import { validateCreateVeiculo } from "../../schemas/validation";
import type { Veiculo } from "../../types/veiculo";
import type { Cliente } from "../../types/cliente";

interface CriarVeiculoModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (veiculo: Veiculo) => void;
}

const INITIAL_FORM_DATA = {
  placa: "",
  modelo: "",
  cor: "",
  clienteId: 0,
};

export const CriarVeiculoModal: React.FC<CriarVeiculoModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(false);

  useEffect(() => {
    if (open) {
      setLoadingClientes(true);
      getClientes()
        .then(setClientes)
        .catch((err) => console.error("Erro ao carregar clientes:", err))
        .finally(() => setLoadingClientes(false));
    }
  }, [open]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "clienteId" ? Number(value) : value,
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleClose = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validation = validateCreateVeiculo(formData);

      if (!validation.success) {
        setErrors(validation.errors);
        return;
      }

      setSalvando(true);

      try {
        const novoVeiculo = await createVeiculo(validation.data);
        onSuccess(novoVeiculo);
        handleClose();
      } catch (error: any) {
        console.error("Erro ao criar veículo:", error);
        const apiMessage = error.response?.data?.message;
        if (apiMessage?.includes("Placa")) {
          setErrors({ placa: apiMessage });
        } else if (apiMessage?.includes("Cliente")) {
          setErrors({ clienteId: apiMessage });
        } else {
          setErrors({
            placa: apiMessage || "Erro ao criar veículo. Tente novamente.",
          });
        }
      } finally {
        setSalvando(false);
      }
    },
    [formData, onSuccess, handleClose]
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Novo Veículo</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Placa"
            name="placa"
            fullWidth
            margin="normal"
            value={formData.placa}
            onChange={handleInputChange}
            error={!!errors.placa}
            helperText={errors.placa}
            disabled={salvando}
            autoFocus
            placeholder="ABC1D23"
            inputProps={{ maxLength: 8, style: { textTransform: "uppercase" } }}
          />
          <TextField
            label="Modelo"
            name="modelo"
            fullWidth
            margin="normal"
            value={formData.modelo}
            onChange={handleInputChange}
            error={!!errors.modelo}
            helperText={errors.modelo}
            disabled={salvando}
            placeholder="Fiat Argo"
          />
          <TextField
            label="Cor"
            name="cor"
            fullWidth
            margin="normal"
            value={formData.cor}
            onChange={handleInputChange}
            error={!!errors.cor}
            helperText={errors.cor}
            disabled={salvando}
            placeholder="Prata"
          />
          <TextField
            select
            label="Cliente"
            name="clienteId"
            fullWidth
            margin="normal"
            value={formData.clienteId || ""}
            onChange={handleInputChange}
            error={!!errors.clienteId}
            helperText={errors.clienteId}
            disabled={salvando || loadingClientes}
          >
            <MenuItem value="">
              {loadingClientes ? "Carregando..." : "Selecione um cliente"}
            </MenuItem>
            {clientes.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.nome} - {cliente.cpf}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={salvando}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={salvando}>
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

export default CriarVeiculoModal;
