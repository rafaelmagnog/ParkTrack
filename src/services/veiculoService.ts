import prisma from "../db/prisma";
import { Veiculo } from "@prisma/client";

const veiculoService = {
  async getAll(): Promise<Veiculo[]> {
    return prisma.veiculo.findMany();
  },

  async getById(id: number): Promise<Veiculo | null> {
    return prisma.veiculo.findUnique({ where: { id } });
  },

  async create(data: {
    placa: string;
    modelo: string;
    cor: string;
    clienteId: number;
  }): Promise<Veiculo> {
    return prisma.veiculo.create({ data });
  },

  async update(
    id: number,
    data: Partial<{
      placa: string;
      modelo: string;
      cor: string;
      clienteId: number;
    }>
  ): Promise<Veiculo> {
    return prisma.veiculo.update({ where: { id }, data });
  },

  async remove(id: number): Promise<void> {
    await prisma.veiculo.delete({ where: { id } });
  },
};

export default veiculoService;
