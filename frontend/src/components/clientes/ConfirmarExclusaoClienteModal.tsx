import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

interface VeiculoVinculado {
  id: number;
  placa: string;
  modelo: string;
}

interface ConfirmarExclusaoClienteModalProps {
  open: boolean;
  clienteNome: string;
  veiculos: VeiculoVinculado[];
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmarExclusaoClienteModal: React.FC<
  ConfirmarExclusaoClienteModalProps
> = ({ open, clienteNome, veiculos, loading, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon color="warning" />
        Cliente possui veículos vinculados
      </DialogTitle>
      <DialogContent>
        <Typography>
          O cliente <strong>{clienteNome}</strong> não pode ser excluído pois
          possui {veiculos.length} veículo(s) vinculado(s):
        </Typography>

        <Box
          sx={{
            mt: 2,
            maxHeight: 200,
            overflow: "auto",
            bgcolor: "action.hover",
            borderRadius: 1,
          }}
        >
          <List dense>
            {veiculos.map((veiculo) => (
              <ListItem key={veiculo.id}>
                <ListItemIcon>
                  <DirectionsCarIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={veiculo.placa}
                  secondary={veiculo.modelo}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Typography sx={{ mt: 2, color: "warning.main" }}>
          Deseja excluir todos os veículos vinculados e o cliente?
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Atenção: Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Excluir Veículos e Cliente"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarExclusaoClienteModal;
