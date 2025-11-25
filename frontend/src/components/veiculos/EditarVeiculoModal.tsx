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
import { updateVeiculo } from "../../services/veiculoService";
import { getClientes } from "../../services/clienteService";
import { validateUpdateVeiculo } from "../../schemas/validation";
import type { Veiculo } from "../../types/veiculo";
import type { Cliente } from "../../types/cliente";

interface EditarVeiculoModalProps {
  open: boolean;
  veiculo: Veiculo | null;
  onClose: () => void;
  onSave: (veiculo: Veiculo) => void;
}

export const EditarVeiculoModal: React.FC<EditarVeiculoModalProps> = ({
  open,
  veiculo,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    placa: "",
    modelo: "",
    cor: "",
    clienteId: 0,
  });
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

  useEffect(() => {
    if (veiculo) {
      setFormData({
        placa: veiculo.placa,
        modelo: veiculo.modelo,
        cor: veiculo.cor,
        clienteId: veiculo.clienteId,
      });
      setErrors({});
    }
  }, [veiculo]);

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!veiculo) return;

      const validation = validateUpdateVeiculo(formData);

      if (!validation.success) {
        setErrors(validation.errors);
        return;
      }

      setSalvando(true);

      try {
        const veiculoAtualizado = await updateVeiculo(
          veiculo.id,
          validation.data
        );
        onSave(veiculoAtualizado);
        onClose();
      } catch (error: any) {
        console.error("Erro ao atualizar veículo:", error);
        const apiMessage = error.response?.data?.message;
        if (apiMessage?.includes("Placa")) {
          setErrors({ placa: apiMessage });
        } else if (apiMessage?.includes("Cliente")) {
          setErrors({ clienteId: apiMessage });
        } else {
          setErrors({
            placa: apiMessage || "Erro ao atualizar veículo. Tente novamente.",
          });
        }
      } finally {
        setSalvando(false);
      }
    },
    [veiculo, formData, onSave, onClose]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Veículo</DialogTitle>
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
          <Button onClick={onClose} disabled={salvando}>
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

export default EditarVeiculoModal;
