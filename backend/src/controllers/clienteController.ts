import { Request, Response } from "express";
import * as clienteService from "../services/clienteService";
import prisma from "../db/prisma";

export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await clienteService.getAll();
    return res.json(clientes);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClienteById = async (req: Request, res: Response) => {
  try {
    const cliente = await clienteService.getById(Number(req.params.id));
    if (!cliente)
      return res.status(404).json({ message: "Cliente não encontrado" });
    return res.json(cliente);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const existe = await prisma.cliente.findUnique({
      where: { cpf: req.body.cpf },
    });
    if (existe) return res.status(409).json({ message: "CPF já cadastrado" });

    const novo = await clienteService.create(req.body);
    return res.status(201).json(novo);
  } catch (error: any) {
    if (error.code === "P2002")
      return res.status(409).json({ message: "CPF já cadastrado" });
    return res.status(500).json({ message: error.message });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (req.body.cpf) {
      const cpfExiste = await prisma.cliente.findFirst({
        where: { cpf: req.body.cpf, NOT: { id } },
      });
      if (cpfExiste)
        return res.status(409).json({ message: "CPF já cadastrado" });
    }

    const atualizado = await clienteService.update(id, req.body);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Cliente não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // Verificar se o cliente possui veículos vinculados
    const veiculosVinculados = await prisma.veiculo.findMany({
      where: { clienteId: id },
      select: {
        id: true,
        placa: true,
        modelo: true,
        cor: true,
        estacionamentos: {
          select: {
            id: true,
            horaEntrada: true,
            horaSaida: true,
            valor: true,
          },
        },
      },
    });

    if (veiculosVinculados.length > 0) {
      const totalEstacionamentos = veiculosVinculados.reduce(
        (acc, v) => acc + v.estacionamentos.length,
        0
      );

      return res.status(409).json({
        message: "Cliente possui veículos vinculados",
        veiculos: veiculosVinculados,
        totalEstacionamentos,
      });
    }

    await clienteService.remove(id);
    return res
      .status(200)
      .json({ message: "Cliente removido com sucesso", id });
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Cliente não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};
