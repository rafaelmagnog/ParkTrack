/**
 * Controller de Clientes
 *
 * Responsável por receber as requisições HTTP relacionadas a clientes,
 * processar os dados e retornar as respostas adequadas.
 *
 * Cada função aqui representa uma ação do CRUD de clientes.
 */

import { Request, Response } from "express";
import * as clienteService from "../services/clienteService";
import prisma from "../db/prisma";

/**
 * Retorna todos os clientes cadastrados
 * GET /clientes
 */
export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await clienteService.getAll();
    return res.json(clientes);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Busca um cliente específico pelo ID
 * GET /clientes/:id
 */
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

/**
 * Cria um novo cliente
 * POST /clientes
 *
 * Antes de criar, verifica se o CPF já está cadastrado para evitar duplicatas.
 */
export const createCliente = async (req: Request, res: Response) => {
  try {
    // Verifica se já existe cliente com este CPF
    const existe = await prisma.cliente.findUnique({
      where: { cpf: req.body.cpf },
    });
    if (existe) return res.status(409).json({ message: "CPF já cadastrado" });

    const novo = await clienteService.create(req.body);
    return res.status(201).json(novo);
  } catch (error: any) {
    // P2002 = violação de unique constraint do Prisma
    if (error.code === "P2002")
      return res.status(409).json({ message: "CPF já cadastrado" });
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Atualiza os dados de um cliente existente
 * PUT /clientes/:id
 *
 * Valida se o novo CPF (caso alterado) não está em uso por outro cliente.
 */
export const updateCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // Se está tentando alterar o CPF, verifica se já não está em uso
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
    // P2025 = registro não encontrado no Prisma
    if (error.code === "P2025")
      return res.status(404).json({ message: "Cliente não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Remove um cliente do sistema
 * DELETE /clientes/:id
 *
 * Antes de excluir, verifica se o cliente possui veículos vinculados.
 * Se tiver, retorna 409 (conflito) com a lista de dependências.
 * Isso permite ao frontend perguntar ao usuário como deseja proceder.
 */
export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // Busca todos os veículos vinculados a este cliente
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

    // Se tem veículos vinculados, não pode excluir diretamente
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

    // Cliente sem dependências - pode excluir normalmente
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
