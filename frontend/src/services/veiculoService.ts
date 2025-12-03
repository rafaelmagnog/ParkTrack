import axios from "axios";
import type {
  Veiculo,
  CreateVeiculoInput,
  UpdateVeiculoInput,
} from "../types/veiculo";
import { API_ENDPOINTS } from "../config/api";

export const getVeiculos = async (): Promise<Veiculo[]> => {
  const response = await axios.get<Veiculo[]>(API_ENDPOINTS.VEICULOS);
  return response.data;
};

export const getVeiculoById = async (id: number): Promise<Veiculo> => {
  const response = await axios.get<Veiculo>(`${API_ENDPOINTS.VEICULOS}/${id}`);
  return response.data;
};

export const createVeiculo = async (
  dados: CreateVeiculoInput
): Promise<Veiculo> => {
  const response = await axios.post<Veiculo>(API_ENDPOINTS.VEICULOS, dados);
  return response.data;
};

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

export const deleteVeiculo = async (
  id: number,
  manterHistorico?: boolean
): Promise<void> => {
  // Se manterHistorico não foi definido, não passa o parâmetro (para verificação)
  // Se foi definido, passa o valor (para ação definitiva)
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
