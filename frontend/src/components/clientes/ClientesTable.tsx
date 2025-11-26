import React from "react";
import type { Cliente } from "../../types/cliente";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const formatarTelefone = (telefone: string): string => {
  const numeros = telefone.replace(/\D/g, "");
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(
      7
    )}`;
  } else if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(
      6
    )}`;
  }
  return telefone;
};

const formatarCPF = (cpf: string): string => {
  const numeros = cpf.replace(/\D/g, "");
  if (numeros.length === 11) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
      6,
      9
    )}-${numeros.slice(9)}`;
  }
  return cpf;
};

interface ClientesTableProps {
  clientes: Cliente[];
  loading?: boolean;
  deletingId: number | null;
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: number) => void;
}

const ClientesTable: React.FC<ClientesTableProps> = ({
  clientes,
  loading = false,
  deletingId,
  onEdit,
  onDelete,
}) => {
  const colunas = ["ID", "Nome", "Telefone", "CPF", "Ações"];

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
          <TableRow sx={{ bgcolor: "primary.main" }}>
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
          {clientes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                Nenhum cliente encontrado.
              </TableCell>
            </TableRow>
          ) : (
            clientes.map((cliente) => (
              <TableRow
                key={cliente.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{cliente.id}</TableCell>
                <TableCell align="center">{cliente.nome}</TableCell>
                <TableCell align="center">
                  {formatarTelefone(cliente.telefone)}
                </TableCell>
                <TableCell align="center">{formatarCPF(cliente.cpf)}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(cliente)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(cliente.id)}
                      disabled={deletingId === cliente.id}
                      size="small"
                    >
                      {deletingId === cliente.id ? (
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

export default ClientesTable;
