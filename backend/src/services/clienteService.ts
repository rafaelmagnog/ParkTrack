import prisma from "../db/prisma";
import { Cliente } from "@prisma/client";

const clienteService = {
  async getAll(): Promise<Cliente[]> {
    return prisma.cliente.findMany({
      include: { veiculos: true },
    });
  },

  async getById(id: number): Promise<Cliente | null> {
    return prisma.cliente.findUnique({
      where: { id },
      include: { veiculos: true },
    });
  },

  async create(data: {
    nome: string;
    telefone: string;
    cpf: string;
  }): Promise<Cliente> {
    return prisma.cliente.create({ data });
  },

  async update(
    id: number,
    data: Partial<{ nome: string; telefone: string; cpf: string }>
  ): Promise<Cliente> {
    return prisma.cliente.update({ where: { id }, data });
  },

  async remove(id: number): Promise<void> {
    await prisma.cliente.delete({ where: { id } });
  },
};

export default clienteService;
