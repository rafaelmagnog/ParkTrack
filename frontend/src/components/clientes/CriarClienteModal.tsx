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

const formatarTelefoneMask = (value: string): string => {
  const numeros = value.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 7)
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(
      7
    )}`;
  }
  return value;
};

const formatarCPFMask = (value: string): string => {
  const numeros = value.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 3) return numeros;
  if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  if (numeros.length <= 9)
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
    6,
    9
  )}-${numeros.slice(9)}`;
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
      let formattedValue = value;

      if (name === "telefone") {
        formattedValue = formatarTelefoneMask(value);
      } else if (name === "cpf") {
        formattedValue = formatarCPFMask(value);
      }

      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
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
            placeholder="(00) 00000-0000"
            inputProps={{ maxLength: 15 }}
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
            placeholder="000.000.000-00"
            inputProps={{ maxLength: 14 }}
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
