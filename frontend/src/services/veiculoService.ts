/**
 * Serviço de comunicação com a API de Veículos
 *
 * Funções para operações CRUD de veículos via HTTP.
 * A exclusão tem lógica especial para preservar histórico.
 */

import axios from "axios";
import type {
  Veiculo,
  CreateVeiculoInput,
  UpdateVeiculoInput,
} from "../types/veiculo";
import { API_ENDPOINTS } from "../config/api";

/** Busca todos os veículos cadastrados */
export const getVeiculos = async (): Promise<Veiculo[]> => {
  const response = await axios.get<Veiculo[]>(API_ENDPOINTS.VEICULOS);
  return response.data;
};

/** Busca um veículo específico pelo ID */
export const getVeiculoById = async (id: number): Promise<Veiculo> => {
  const response = await axios.get<Veiculo>(`${API_ENDPOINTS.VEICULOS}/${id}`);
  return response.data;
};

/** Cria um novo veículo vinculado a um cliente */
export const createVeiculo = async (
  dados: CreateVeiculoInput
): Promise<Veiculo> => {
  const response = await axios.post<Veiculo>(API_ENDPOINTS.VEICULOS, dados);
  return response.data;
};

/** Atualiza os dados de um veículo existente */
export const updateVeiculo = async (
  id: number,
  dados: UpdateVeiculoInput
): Promise<Veiculo> => {
  const response = await axios.put<Veiculo>(
    `${API_ENDPOINTS.VEICULOS}/${id}`,
    dados
  );
  return response.data;
};

/**
 * Remove um veículo do sistema.
 * @param manterHistorico - Se true, mantém dados nos estacionamentos finalizados.
 *                          Se undefined, verifica se há histórico (retorna 409 se houver).
 */
export const deleteVeiculo = async (
  id: number,
  manterHistorico?: boolean
): Promise<void> => {
  // Sem manterHistorico = verificação; com = ação definitiva
  const url =
    manterHistorico === undefined
      ? `${API_ENDPOINTS.VEICULOS}/${id}`
      : `${API_ENDPOINTS.VEICULOS}/${id}?manterHistorico=${manterHistorico}`;
  await axios.delete(url);
};

export default {
  getVeiculos,
  getVeiculoById,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
};
