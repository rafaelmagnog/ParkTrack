import React, { useState } from "react";
import type { Estacionamento } from "../../types/estacionamento";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  Chip,
  Popover,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface EstacionamentosTableProps {
  estacionamentos: Estacionamento[];
  loading?: boolean;
  deletingId: number | null;
  onEdit: (estacionamento: Estacionamento) => void;
  onDelete: (id: number) => void;
  onRegistrarSaida: (estacionamento: Estacionamento) => void;
}

const formatDateTime = (dateString: string | null | undefined): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "-";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const EstacionamentosTable: React.FC<EstacionamentosTableProps> = ({
  estacionamentos,
  loading = false,
  deletingId,
  onEdit,
  onDelete,
  onRegistrarSaida,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedEstacionamento, setSelectedEstacionamento] =
    useState<Estacionamento | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    estacionamento: Estacionamento
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedEstacionamento(estacionamento);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedEstacionamento(null);
  };

  const open = Boolean(anchorEl);

  // Extrai informações do veículo (do objeto veiculo ou do snapshot)
  const getVeiculoInfo = (estacionamento: Estacionamento) => {
    if (estacionamento.veiculo) {
      return {
        placa: estacionamento.veiculo.placa,
        modelo: estacionamento.veiculo.modelo,
        cor: estacionamento.veiculo.cor,
        clienteNome: estacionamento.veiculo.cliente?.nome || "N/A",
        isSnapshot: false,
      };
    }
    if (estacionamento.veiculoSnapshot) {
      return {
        placa: estacionamento.veiculoSnapshot.placa,
        modelo: estacionamento.veiculoSnapshot.modelo,
        cor: estacionamento.veiculoSnapshot.cor,
        clienteNome: estacionamento.veiculoSnapshot.clienteNome,
        isSnapshot: true,
      };
    }
    return null;
  };

  const colunas = [
    "ID",
    "Veículo",
    "Entrada",
    "Saída",
    "Valor",
    "Status",
    "Ações",
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "success.main" }}>
            {colunas.map((coluna) => (
              <TableCell
                key={coluna}
                align="center"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                {coluna}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {estacionamentos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                Nenhum estacionamento encontrado.
              </TableCell>
            </TableRow>
          ) : (
            estacionamentos.map((estacionamento) => {
              const isAtivo = !estacionamento.horaSaida;
              const veiculoInfo = getVeiculoInfo(estacionamento);
              return (
                <TableRow
                  key={estacionamento.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{estacionamento.id}</TableCell>
                  <TableCell align="center">
                    {veiculoInfo ? (
                      <Chip
                        label={veiculoInfo.placa}
                        size="small"
                        color={veiculoInfo.isSnapshot ? "warning" : "primary"}
                        variant={veiculoInfo.isSnapshot ? "outlined" : "filled"}
                        onClick={(e) => handlePopoverOpen(e, estacionamento)}
                        icon={
                          veiculoInfo.isSnapshot ? (
                            <InfoOutlinedIcon fontSize="small" />
                          ) : undefined
                        }
                        sx={{
                          cursor: "pointer",
                          fontWeight: 600,
                          "&:hover": {
                            opacity: 0.85,
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Dados indisponíveis
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {formatDateTime(estacionamento.horaEntrada)}
                  </TableCell>
                  <TableCell align="center">
                    {formatDateTime(estacionamento.horaSaida)}
                  </TableCell>
                  <TableCell align="center">
                    {formatCurrency(estacionamento.valor)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={isAtivo ? "Ativo" : "Finalizado"}
                      color={isAtivo ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {isAtivo && (
                      <Tooltip title="Registrar Saída">
                        <IconButton
                          color="warning"
                          onClick={() => onRegistrarSaida(estacionamento)}
                          size="small"
                        >
                          <ExitToAppIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Editar">
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(estacionamento)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        color="error"
                        onClick={() => onDelete(estacionamento.id)}
                        disabled={deletingId === estacionamento.id}
                        size="small"
                      >
                        {deletingId === estacionamento.id ? (
                          <CircularProgress size={20} />
                        ) : (
                          <DeleteIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Popover com detalhes do veículo */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              p: 2,
              minWidth: 220,
              borderRadius: 2,
            },
          },
        }}
      >
        {selectedEstacionamento &&
          (() => {
            const info = getVeiculoInfo(selectedEstacionamento);
            if (!info) return null;
            return (
              <Stack spacing={1.5}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DirectionsCarIcon color="primary" />
                  <Typography variant="subtitle1" fontWeight={600}>
                    Detalhes do Veículo
                  </Typography>
                  {info.isSnapshot && (
                    <Chip
                      label="Histórico"
                      size="small"
                      color="warning"
                      sx={{ ml: "auto" }}
                    />
                  )}
                </Box>
                <Divider />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Placa
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {info.placa}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Modelo
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {info.modelo}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ColorLensIcon fontSize="small" color="action" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Cor
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {info.cor}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <PersonIcon fontSize="small" color="action" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Cliente
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {info.clienteNome}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            );
          })()}
      </Popover>
    </TableContainer>
  );
};

export default EstacionamentosTable;
