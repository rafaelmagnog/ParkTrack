/**
 * Modal de confirmação de exclusão
 */

import { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface ConfirmarExclusaoModalProps {
  open: boolean;
  titulo: string;
  mensagem: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmarExclusaoModal: React.FC<ConfirmarExclusaoModalProps> = ({
  open,
  titulo,
  mensagem,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  // Guarda a última mensagem válida - resolve problema do undefined no fechamento
  const lastMensagemRef = useRef(mensagem);

  // Atualiza ref só quando a mensagem é válida
  useEffect(() => {
    if (mensagem && !mensagem.includes("undefined")) {
      lastMensagemRef.current = mensagem;
    }
  }, [mensagem]);

  // Usa a mensagem atual ou a última válida se a atual for undefined
  const displayMensagem = mensagem?.includes("undefined")
    ? lastMensagemRef.current
    : mensagem;

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon color="warning" />
        {titulo}
      </DialogTitle>
      <DialogContent>
        <Typography>{displayMensagem}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} disabled={loading} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          color="error"
          variant="contained"
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? "Excluindo..." : "Excluir"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
