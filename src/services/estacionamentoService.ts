import prisma from "../db/prisma";
import { Estacionamento } from "@prisma/client";

const estacionamentoService = {
  async getAll(): Promise<Estacionamento[]> {
    return prisma.estacionamento.findMany();
  },

  async getDetailed(): Promise<Estacionamento[]> {
    return prisma.estacionamento.findMany({
      include: { veiculo: { include: { cliente: true } } },
    });
  },

  async getById(id: number): Promise<Estacionamento | null> {
    return prisma.estacionamento.findUnique({ where: { id } });
  },

  async create(data: { veiculoId: number }): Promise<Estacionamento> {
    return prisma.estacionamento.create({ data });
  },

  async update(
    id: number,
    data: Partial<{ horaSaida?: Date | null; valor?: number }>
  ): Promise<Estacionamento> {
    return prisma.estacionamento.update({ where: { id }, data });
  },

  async remove(id: number): Promise<void> {
    await prisma.estacionamento.delete({ where: { id } });
  },
};

export default estacionamentoService;
