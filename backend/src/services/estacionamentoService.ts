import prisma from "../db/prisma";
import { Estacionamento } from "@prisma/client";

export const getAll = async (): Promise<Estacionamento[]> => {
  return prisma.estacionamento.findMany({
    include: { veiculo: true },
  });
};

export const getDetailed = async (): Promise<any[]> => {
  return prisma.estacionamento.findMany({
    include: {
      veiculo: {
        include: { cliente: true },
      },
    },
  });
};

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

export const create = async (data: {
  veiculoId: number;
}): Promise<Estacionamento> => {
  return prisma.estacionamento.create({
    data,
    include: { veiculo: true },
  });
};

export const update = async (
  id: number,
  data: Partial<{ horaSaida?: string; valor?: number }>
): Promise<Estacionamento> => {
  const updateData: any = {};
  if (data.horaSaida) updateData.horaSaida = new Date(data.horaSaida);
  if (data.valor !== undefined) updateData.valor = data.valor;
  return prisma.estacionamento.update({
    where: { id },
    data: updateData,
    include: { veiculo: true },
  });
};

export const remove = async (id: number): Promise<void> => {
  await prisma.estacionamento.delete({ where: { id } });
};
