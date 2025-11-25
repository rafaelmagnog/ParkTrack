import axios from "axios";
import type {
  Cliente,
  CreateClienteInput,
  UpdateClienteInput,
} from "../types/cliente";
import { API_ENDPOINTS } from "../config/api";

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await axios.get<Cliente[]>(API_ENDPOINTS.CLIENTES);
  return response.data;
};

export const getClienteById = async (id: number): Promise<Cliente> => {
  const response = await axios.get<Cliente>(`${API_ENDPOINTS.CLIENTES}/${id}`);
  return response.data;
};

export const createCliente = async (
  dados: CreateClienteInput
): Promise<Cliente> => {
  const response = await axios.post<Cliente>(API_ENDPOINTS.CLIENTES, dados);
  return response.data;
};

export const updateCliente = async (
  id: number,
  dados: UpdateClienteInput
): Promise<Cliente> => {
  const response = await axios.put<Cliente>(
    `${API_ENDPOINTS.CLIENTES}/${id}`,
    dados
  );
  return response.data;
};

export const deleteCliente = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.CLIENTES}/${id}`);
};

export default {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
