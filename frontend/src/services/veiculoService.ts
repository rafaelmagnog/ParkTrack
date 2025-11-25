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

export const deleteVeiculo = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.VEICULOS}/${id}`);
};

export default {
  getVeiculos,
  getVeiculoById,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
};
