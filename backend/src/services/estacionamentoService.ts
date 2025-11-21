import prisma from "../db/prisma";
import { Estacionamento } from "@prisma/client";

const estacionamentoService = {
  async getAll(): Promise<Estacionamento[]> {
    return prisma.estacionamento.findMany({
      include: { veiculo: true },
    });
  },

  async getDetailed(): Promise<any[]> {
    return prisma.estacionamento.findMany({
      include: {
        veiculo: {
          include: { cliente: true },
        },
      },
    });
  },

  async getById(id: number): Promise<Estacionamento | null> {
    return prisma.estacionamento.findUnique({
      where: { id },
      include: { veiculo: true },
    });
  },

  async create(data: { veiculoId: number }): Promise<Estacionamento> {
    return prisma.estacionamento.create({ data });
  },

  async update(
    id: number,
    data: Partial<{ horaSaida?: string; valor?: number }>
  ): Promise<Estacionamento> {
    const updateData: any = {};
    if (data.horaSaida) updateData.horaSaida = new Date(data.horaSaida);
    if (data.valor !== undefined) updateData.valor = data.valor;
    return prisma.estacionamento.update({ where: { id }, data: updateData });
  },

  async remove(id: number): Promise<void> {
    await prisma.estacionamento.delete({ where: { id } });
  },
};

export default estacionamentoService;
