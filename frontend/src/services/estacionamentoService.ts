import axios from "axios";
import type {
  Estacionamento,
  CreateEstacionamentoInput,
  UpdateEstacionamentoInput,
} from "../types/estacionamento";
import { API_ENDPOINTS } from "../config/api";

export const getEstacionamentos = async (): Promise<Estacionamento[]> => {
  const response = await axios.get<Estacionamento[]>(
    API_ENDPOINTS.ESTACIONAMENTOS
  );
  return response.data;
};

export const getEstacionamentoById = async (
  id: number
): Promise<Estacionamento> => {
  const response = await axios.get<Estacionamento>(
    `${API_ENDPOINTS.ESTACIONAMENTOS}/${id}`
  );
  return response.data;
};

export const createEstacionamento = async (
  dados: CreateEstacionamentoInput
): Promise<Estacionamento> => {
  const response = await axios.post<Estacionamento>(
    API_ENDPOINTS.ESTACIONAMENTOS,
    dados
  );
  return response.data;
};

export const updateEstacionamento = async (
  id: number,
  dados: UpdateEstacionamentoInput
): Promise<Estacionamento> => {
  const response = await axios.put<Estacionamento>(
    `${API_ENDPOINTS.ESTACIONAMENTOS}/${id}`,
    dados
  );
  return response.data;
};

export const deleteEstacionamento = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.ESTACIONAMENTOS}/${id}`);
};

export default {
  getEstacionamentos,
  getEstacionamentoById,
  createEstacionamento,
  updateEstacionamento,
  deleteEstacionamento,
};
