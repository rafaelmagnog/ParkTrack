/**
 * Serviço de comunicação com a API de Estacionamentos
 *
 * Funções para gerenciar registros de entrada/saída de veículos.
 * Create = entrada, Update = finalização com valor.
 */

import axios from "axios";
import type {
  Estacionamento,
  CreateEstacionamentoInput,
  UpdateEstacionamentoInput,
} from "../types/estacionamento";
import { API_ENDPOINTS } from "../config/api";

/** Busca todos os registros de estacionamento */
export const getEstacionamentos = async (): Promise<Estacionamento[]> => {
  const response = await axios.get<Estacionamento[]>(
    API_ENDPOINTS.ESTACIONAMENTOS
  );
  return response.data;
};

/** Busca um registro específico pelo ID */
export const getEstacionamentoById = async (
  id: number
): Promise<Estacionamento> => {
  const response = await axios.get<Estacionamento>(
    `${API_ENDPOINTS.ESTACIONAMENTOS}/${id}`
  );
  return response.data;
};

/** Registra entrada de um veículo no estacionamento */
export const createEstacionamento = async (
  dados: CreateEstacionamentoInput
): Promise<Estacionamento> => {
  const response = await axios.post<Estacionamento>(
    API_ENDPOINTS.ESTACIONAMENTOS,
    dados
  );
  return response.data;
};

/** Atualiza registro (geralmente para finalizar com horaSaida e valor) */
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

/** Remove um registro de estacionamento */
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
