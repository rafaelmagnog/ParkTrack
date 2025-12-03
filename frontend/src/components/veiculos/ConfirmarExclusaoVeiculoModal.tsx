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
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HistoryIcon from "@mui/icons-material/History";

interface EstacionamentoVinculado {
  id: number;
  horaEntrada: string;
  horaSaida: string | null;
  valor: number | null;
}

interface VeiculoInfo {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  clienteNome: string;
}

interface ConfirmarExclusaoVeiculoModalProps {
  open: boolean;
  veiculo: VeiculoInfo | null;
  estacionamentos: EstacionamentoVinculado[];
  loading: boolean;
  onConfirmDeleteAll: () => void;
  onConfirmKeepHistory: () => void;
  onCancel: () => void;
}

const formatarDataHora = (dataHora: string): string => {
  return new Date(dataHora).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const ConfirmarExclusaoVeiculoModal: React.FC<
  ConfirmarExclusaoVeiculoModalProps
> = ({
  open,
  veiculo,
  estacionamentos,
  loading,
  onConfirmDeleteAll,
  onConfirmKeepHistory,
  onCancel,
}) => {
  if (!veiculo) return null;

  const estacionamentosAtivos = estacionamentos.filter((e) => !e.horaSaida);

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon color="warning" />
        Veículo possui estacionamentos vinculados
      </DialogTitle>
      <DialogContent>
        <Typography>
          O veículo <strong>{veiculo.placa}</strong> ({veiculo.modelo} -{" "}
          {veiculo.cor}) do cliente <strong>{veiculo.clienteNome}</strong> não
          pode ser excluído pois possui {estacionamentos.length}{" "}
          estacionamento(s) vinculado(s):
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
            {estacionamentos.slice(0, 5).map((est) => (
              <ListItem key={est.id}>
                <ListItemIcon>
                  <LocalParkingIcon
                    color={est.horaSaida ? "success" : "warning"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={formatarDataHora(est.horaEntrada)}
                  secondary={
                    est.horaSaida
                      ? `Finalizado - R$ ${est.valor?.toFixed(2) || "0,00"}`
                      : "Em andamento"
                  }
                />
              </ListItem>
            ))}
            {estacionamentos.length > 5 && (
              <ListItem>
                <ListItemText
                  secondary={`... e mais ${
                    estacionamentos.length - 5
                  } estacionamento(s)`}
                />
              </ListItem>
            )}
          </List>
        </Box>

        {estacionamentosAtivos.length > 0 && (
          <Typography variant="caption" color="warning.main" sx={{ mt: 1 }}>
            ⚠️ {estacionamentosAtivos.length} estacionamento(s) ainda ativo(s)
            serão finalizados automaticamente.
          </Typography>
        )}

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
              Remove o veículo e todos os {estacionamentos.length}{" "}
              estacionamentos vinculados. Esta ação não pode ser desfeita.
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
              Remove o veículo mas preserva os {estacionamentos.length}{" "}
              registros de estacionamento para consulta futura.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirmDeleteAll}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={16} /> : <DeleteForeverIcon />
          }
        >
          Excluir Tudo
        </Button>
        <Button
          onClick={onConfirmKeepHistory}
          color="warning"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : <HistoryIcon />}
        >
          Manter Histórico
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarExclusaoVeiculoModal;
