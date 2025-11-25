import React from "react";
import type { Veiculo } from "../../types/veiculo";
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

interface VeiculosTableProps {
  veiculos: Veiculo[];
  loading?: boolean;
  deletingId: number | null;
  onEdit: (veiculo: Veiculo) => void;
  onDelete: (id: number) => void;
}

const VeiculosTable: React.FC<VeiculosTableProps> = ({
  veiculos,
  loading = false,
  deletingId,
  onEdit,
  onDelete,
}) => {
  const colunas = ["ID", "Placa", "Modelo", "Cor", "Cliente", "Ações"];

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
          <TableRow sx={{ bgcolor: "secondary.main" }}>
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
          {veiculos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                Nenhum veículo encontrado.
              </TableCell>
            </TableRow>
          ) : (
            veiculos.map((veiculo) => (
              <TableRow
                key={veiculo.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{veiculo.id}</TableCell>
                <TableCell align="center">
                  <Chip label={veiculo.placa} size="small" variant="outlined" />
                </TableCell>
                <TableCell align="center">{veiculo.modelo}</TableCell>
                <TableCell align="center">{veiculo.cor}</TableCell>
                <TableCell align="center">
                  {veiculo.cliente?.nome || `ID: ${veiculo.clienteId}`}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(veiculo)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(veiculo.id)}
                      disabled={deletingId === veiculo.id}
                      size="small"
                    >
                      {deletingId === veiculo.id ? (
                        <CircularProgress size={20} />
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VeiculosTable;
