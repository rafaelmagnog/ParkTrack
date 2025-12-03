import prisma from "../db/prisma";
import { Cliente } from "@prisma/client";

export const getAll = async (): Promise<Cliente[]> => {
  return prisma.cliente.findMany({
    include: { veiculos: true },
  });
};

export const getById = async (id: number): Promise<Cliente | null> => {
  return prisma.cliente.findUnique({
    where: { id },
    include: { veiculos: true },
  });
};

export const create = async (data: {
  nome: string;
  telefone: string;
  cpf: string;
}): Promise<Cliente> => {
  return prisma.cliente.create({ data });
};

export const update = async (
  id: number,
  data: Partial<{ nome: string; telefone: string; cpf: string }>
): Promise<Cliente> => {
  return prisma.cliente.update({ where: { id }, data });
};

export const remove = async (id: number): Promise<void> => {
  await prisma.cliente.delete({ where: { id } });
};
