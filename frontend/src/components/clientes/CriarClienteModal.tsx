import { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { createCliente } from "../../services/clienteService";
import { validateCreateCliente } from "../../schemas/validation";
import type { Cliente } from "../../types/cliente";

interface CriarClienteModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (cliente: Cliente) => void;
}

const INITIAL_FORM_DATA = {
  nome: "",
  telefone: "",
  cpf: "",
};

export const CriarClienteModal: React.FC<CriarClienteModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
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

      const validation = validateCreateCliente(formData);

      if (!validation.success) {
        setErrors(validation.errors);
        return;
      }

      setSalvando(true);

      try {
        const novoCliente = await createCliente(validation.data);
        onSuccess(novoCliente);
        handleClose();
      } catch (error: any) {
        console.error("Erro ao criar cliente:", error);
        const apiMessage = error.response?.data?.message;
        if (apiMessage?.includes("CPF")) {
          setErrors({ cpf: apiMessage });
        } else {
          setErrors({
            nome: apiMessage || "Erro ao criar cliente. Tente novamente.",
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
      <DialogTitle>Novo Cliente</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Nome"
            name="nome"
            fullWidth
            margin="normal"
            value={formData.nome}
            onChange={handleInputChange}
            error={!!errors.nome}
            helperText={errors.nome}
            disabled={salvando}
            autoFocus
          />
          <TextField
            label="Telefone"
            name="telefone"
            fullWidth
            margin="normal"
            value={formData.telefone}
            onChange={handleInputChange}
            error={!!errors.telefone}
            helperText={errors.telefone}
            disabled={salvando}
            placeholder="11999999999"
          />
          <TextField
            label="CPF"
            name="cpf"
            fullWidth
            margin="normal"
            value={formData.cpf}
            onChange={handleInputChange}
            error={!!errors.cpf}
            helperText={errors.cpf}
            disabled={salvando}
            placeholder="12345678901"
            inputProps={{ maxLength: 11 }}
          />
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

export default CriarClienteModal;
