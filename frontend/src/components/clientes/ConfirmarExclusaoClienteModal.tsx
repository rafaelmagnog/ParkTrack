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
  Divider,
  Stack,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HistoryIcon from "@mui/icons-material/History";

interface VeiculoVinculado {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  estacionamentos: Array<{
    id: number;
    horaEntrada: string;
    horaSaida: string | null;
    valor: number | null;
  }>;
}

interface ConfirmarExclusaoClienteModalProps {
  open: boolean;
  clienteNome: string;
  veiculos: VeiculoVinculado[];
  totalEstacionamentos: number;
  loading: boolean;
  onConfirmDeleteAll: () => void;
  onConfirmKeepHistory: () => void;
  onCancel: () => void;
}

export const ConfirmarExclusaoClienteModal: React.FC<
  ConfirmarExclusaoClienteModalProps
> = ({
  open,
  clienteNome,
  veiculos,
  totalEstacionamentos,
  loading,
  onConfirmDeleteAll,
  onConfirmKeepHistory,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon color="warning" />
        Cliente possui veículos vinculados
      </DialogTitle>
      <DialogContent>
        <Typography>
          O cliente <strong>{clienteNome}</strong> não pode ser excluído pois
          possui {veiculos.length} veículo(s) vinculado(s)
          {totalEstacionamentos > 0 &&
            ` e ${totalEstacionamentos} estacionamento(s)`}
          :
        </Typography>

        <Box
          sx={{
            mt: 2,
            maxHeight: 150,
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
                  secondary={`${veiculo.modelo} - ${veiculo.cor} (${veiculo.estacionamentos.length} estacionamento(s))`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Escolha uma opção:
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box
            sx={{
              p: 2,
              border: 1,
              borderColor: "error.main",
              borderRadius: 1,
              bgcolor: "error.dark",
              opacity: 0.9,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              color="error.contrastText"
            >
              <DeleteForeverIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Excluir tudo
            </Typography>
            <Typography variant="caption" color="error.contrastText">
              Remove cliente, veículos e todos os estacionamentos vinculados.
              Esta ação não pode ser desfeita.
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              border: 1,
              borderColor: "warning.main",
              borderRadius: 1,
              bgcolor: "warning.dark",
              opacity: 0.9,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              color="warning.contrastText"
            >
              <HistoryIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Manter histórico de estacionamentos
            </Typography>
            <Typography variant="caption" color="warning.contrastText">
              Remove cliente e veículos, mas mantém o histórico de
              estacionamentos com os dados do veículo salvos.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1, flexWrap: "wrap" }}>
        <Button onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={onConfirmKeepHistory}
          disabled={loading || totalEstacionamentos === 0}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <HistoryIcon />
            )
          }
        >
          Manter Histórico
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirmDeleteAll}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <DeleteForeverIcon />
            )
          }
        >
          Excluir Tudo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarExclusaoClienteModal;
