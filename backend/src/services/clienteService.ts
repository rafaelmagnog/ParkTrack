/**
 * Service de Clientes
 *
 * Camada de serviço responsável pela lógica de negócio relacionada a clientes.
 * Aqui ficam as operações de acesso ao banco de dados via Prisma.
 * O controller chama esses métodos - assim mantemos o código organizado.
 */

import prisma from "../db/prisma";
import { Cliente } from "@prisma/client";

/**
 * Busca todos os clientes com seus veículos associados
 */
export const getAll = async (): Promise<Cliente[]> => {
  return prisma.cliente.findMany({
    include: { veiculos: true },
  });
};

/**
 * Busca um cliente pelo ID, incluindo seus veículos
 */
export const getById = async (id: number): Promise<Cliente | null> => {
  return prisma.cliente.findUnique({
    where: { id },
    include: { veiculos: true },
  });
};

/**
 * Cria um novo cliente no banco de dados
 */
export const create = async (data: {
  nome: string;
  telefone: string;
  cpf: string;
}): Promise<Cliente> => {
  return prisma.cliente.create({ data });
};

/**
 * Atualiza os dados de um cliente existente
 * Aceita atualização parcial (só os campos enviados são alterados)
 */
export const update = async (
  id: number,
  data: Partial<{ nome: string; telefone: string; cpf: string }>
): Promise<Cliente> => {
  return prisma.cliente.update({ where: { id }, data });
};

/**
 * Remove um cliente do banco de dados
 */
export const remove = async (id: number): Promise<void> => {
  await prisma.cliente.delete({ where: { id } });
};
