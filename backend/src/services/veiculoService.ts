/**
 * Service de Veículos
 *
 * Camada de serviço para operações com veículos.
 * Todas as queries incluem os dados do cliente dono do veículo
 * para facilitar a exibição no frontend.
 */

import prisma from "../db/prisma";
import { Veiculo } from "@prisma/client";

/**
 * Retorna todos os veículos cadastrados com dados do cliente
 */
export const getAll = async (): Promise<Veiculo[]> => {
  return prisma.veiculo.findMany({
    include: { cliente: true },
  });
};

/**
 * Busca um veículo específico pelo ID
 */
export const getById = async (id: number): Promise<Veiculo | null> => {
  return prisma.veiculo.findUnique({
    where: { id },
    include: { cliente: true },
  });
};

/**
 * Cadastra um novo veículo vinculado a um cliente
 */
export const create = async (data: {
  placa: string;
  modelo: string;
  cor: string;
  clienteId: number;
}): Promise<Veiculo> => {
  return prisma.veiculo.create({
    data,
    include: { cliente: true },
  });
};

/**
 * Atualiza os dados de um veículo
 * Permite alterar placa, modelo, cor ou trocar de cliente
 */
export const update = async (
  id: number,
  data: Partial<{
    placa: string;
    modelo: string;
    cor: string;
    clienteId: number;
  }>
): Promise<Veiculo> => {
  return prisma.veiculo.update({
    where: { id },
    data,
    include: { cliente: true },
  });
};

/**
 * Remove um veículo do banco de dados
 */
export const remove = async (id: number): Promise<void> => {
  await prisma.veiculo.delete({ where: { id } });
};
