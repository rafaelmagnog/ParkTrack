import prisma from "../db/prisma";
import { Veiculo } from "@prisma/client";

export const getAll = async (): Promise<Veiculo[]> => {
  return prisma.veiculo.findMany({
    include: { cliente: true },
  });
};

export const getById = async (id: number): Promise<Veiculo | null> => {
  return prisma.veiculo.findUnique({
    where: { id },
    include: { cliente: true },
  });
};

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

export const remove = async (id: number): Promise<void> => {
  await prisma.veiculo.delete({ where: { id } });
};
