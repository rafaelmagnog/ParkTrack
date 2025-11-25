import React from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
              return (
                <TableRow
                  key={estacionamento.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{estacionamento.id}</TableCell>
                  <TableCell align="center">
                    {estacionamento.veiculo?.placa ||
                      `ID: ${estacionamento.veiculoId}`}
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
    </TableContainer>
  );
};

export default EstacionamentosTable;
