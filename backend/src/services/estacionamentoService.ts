/**
 * Service de Estacionamentos
 *
 * Gerencia as operações de banco de dados para registros de estacionamento.
 * Os registros contêm hora de entrada, hora de saída e valor cobrado.
 */

import prisma from "../db/prisma";
import { Estacionamento } from "@prisma/client";

/**
 * Retorna todos os estacionamentos (simples, só com veículo)
 */
export const getAll = async (): Promise<Estacionamento[]> => {
  return prisma.estacionamento.findMany({
    include: { veiculo: true },
  });
};

/**
 * Retorna estacionamentos com dados completos (veículo + cliente)
 * Útil para exibição na tabela do frontend
 */
export const getDetailed = async (): Promise<any[]> => {
  return prisma.estacionamento.findMany({
    include: {
      veiculo: {
        include: { cliente: true },
      },
    },
  });
};

/**
 * Busca um registro de estacionamento pelo ID
 */
export const getById = async (id: number): Promise<Estacionamento | null> => {
  return prisma.estacionamento.findUnique({
    where: { id },
    include: {
      veiculo: {
        include: { cliente: true },
      },
    },
  });
};

/**
 * Registra uma nova entrada de veículo
 * A hora de entrada é definida automaticamente pelo banco (default: now())
 */
export const create = async (data: {
  veiculoId: number;
}): Promise<Estacionamento> => {
  return prisma.estacionamento.create({
    data,
    include: { veiculo: true },
  });
};

/**
 * Atualiza um registro de estacionamento
 * Usado principalmente para registrar a saída e o valor cobrado
 */
export const update = async (
  id: number,
  data: Partial<{ horaSaida?: string; valor?: number }>
): Promise<Estacionamento> => {
  // Monta o objeto de atualização convertendo tipos quando necessário
  const updateData: any = {};
  if (data.horaSaida) updateData.horaSaida = new Date(data.horaSaida);
  if (data.valor !== undefined) updateData.valor = data.valor;

  return prisma.estacionamento.update({
    where: { id },
    data: updateData,
    include: { veiculo: true },
  });
};

/**
 * Remove um registro de estacionamento
 */
export const remove = async (id: number): Promise<void> => {
  await prisma.estacionamento.delete({ where: { id } });
};
