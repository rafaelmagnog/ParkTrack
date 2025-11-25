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

interface ConfirmarFinalizarModalProps {
  open: boolean;
  placa: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmarFinalizarModal: React.FC<
  ConfirmarFinalizarModalProps
> = ({ open, placa, loading, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon color="warning" />
        Veículo já estacionado
      </DialogTitle>
      <DialogContent>
        <Typography>
          O veículo <strong>{placa}</strong> já possui um estacionamento ativo.
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Deseja finalizar o estacionamento anterior e registrar uma nova
          entrada?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Finalizar e Registrar Nova Entrada"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarFinalizarModal;
