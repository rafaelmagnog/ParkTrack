/**
 * Controller de Veículos
 *
 * Gerencia todas as operações relacionadas a veículos no sistema.
 * Inclui lógica especial para exclusão com opção de manter histórico
 * de estacionamentos (snapshot) ou deletar tudo.
 */

import { Request, Response } from "express";
import * as veiculoService from "../services/veiculoService";
import prisma from "../db/prisma";

// Valor cobrado por hora de estacionamento
const PRECO_POR_HORA = 10;

/**
 * Calcula o valor a ser cobrado baseado no tempo estacionado
 * Regra: mínimo de 1 hora, arredondando para cima
 */
const calcularValor = (horaEntrada: Date, horaSaida: Date): number => {
  const diffMs = horaSaida.getTime() - horaEntrada.getTime();
  const diffHoras = diffMs / (1000 * 60 * 60);
  // Garante pelo menos 1 hora de cobrança
  const horasCobranca = Math.max(1, Math.ceil(diffHoras));
  return horasCobranca * PRECO_POR_HORA;
};

/**
 * Retorna todos os veículos cadastrados
 * GET /veiculos
 */
export const getAllVeiculos = async (req: Request, res: Response) => {
  try {
    const veiculos = await veiculoService.getAll();
    return res.json(veiculos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Busca um veículo pelo ID
 * GET /veiculos/:id
 */
export const getVeiculoById = async (req: Request, res: Response) => {
  try {
    const veiculo = await veiculoService.getById(Number(req.params.id));
    if (!veiculo)
      return res.status(404).json({ message: "Veículo não encontrado" });
    return res.json(veiculo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Cadastra um novo veículo
 * POST /veiculos
 *
 * Validações:
 * - Placa não pode estar duplicada
 * - Cliente referenciado deve existir
 */
export const createVeiculo = async (req: Request, res: Response) => {
  try {
    // Verifica se a placa já está cadastrada
    const placaExiste = await prisma.veiculo.findUnique({
      where: { placa: req.body.placa.toUpperCase() },
    });
    if (placaExiste)
      return res.status(409).json({ message: "Placa já cadastrada" });

    // Verifica se o cliente existe
    const clienteExiste = await prisma.cliente.findUnique({
      where: { id: req.body.clienteId },
    });
    if (!clienteExiste)
      return res
        .status(404)
        .json({ message: "Cliente referenciado não existe" });

    const veiculo = await veiculoService.create(req.body);
    return res.status(201).json(veiculo);
  } catch (error: any) {
    if (error.code === "P2002")
      return res.status(409).json({ message: "Placa já cadastrada" });
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Atualiza os dados de um veículo
 * PUT /veiculos/:id
 */
export const updateVeiculo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // Se está alterando a placa, verifica duplicidade
    if (req.body.placa) {
      const placaExiste = await prisma.veiculo.findFirst({
        where: { placa: req.body.placa.toUpperCase(), NOT: { id } },
      });
      if (placaExiste)
        return res.status(409).json({ message: "Placa já cadastrada" });
    }

    // Se está alterando o cliente, verifica se existe
    if (req.body.clienteId) {
      const clienteExiste = await prisma.cliente.findUnique({
        where: { id: req.body.clienteId },
      });
      if (!clienteExiste)
        return res
          .status(404)
          .json({ message: "Cliente referenciado não existe" });
    }

    const atualizado = await veiculoService.update(id, req.body);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Veículo não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Remove um veículo do sistema
 * DELETE /veiculos/:id?manterHistorico=true|false
 *
 * Comportamento:
 * - Sem query param: retorna 409 se tem estacionamentos (para perguntar ao usuário)
 * - manterHistorico=true: salva snapshot do veículo nos estacionamentos antes de deletar
 * - manterHistorico=false: deleta tudo (veículo + estacionamentos)
 */
export const deleteVeiculo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const manterHistorico = req.query.manterHistorico === "true";

    // Busca o veículo com dados do cliente
    const veiculo = await prisma.veiculo.findUnique({
      where: { id },
      include: { cliente: { select: { nome: true } } },
    });

    if (!veiculo) {
      return res.status(404).json({ message: "Veículo não encontrado" });
    }

    // Busca estacionamentos vinculados
    const estacionamentos = await prisma.estacionamento.findMany({
      where: { veiculoId: id },
      select: { id: true, horaEntrada: true, horaSaida: true, valor: true },
    });

    // Se tem estacionamentos e não foi passado manterHistorico, retorna 409
    // Isso permite ao frontend perguntar ao usuário o que fazer
    if (estacionamentos.length > 0 && req.query.manterHistorico === undefined) {
      return res.status(409).json({
        message: "Veículo possui estacionamentos vinculados",
        veiculo: {
          id: veiculo.id,
          placa: veiculo.placa,
          modelo: veiculo.modelo,
          cor: veiculo.cor,
          clienteNome: veiculo.cliente.nome,
        },
        estacionamentos,
        totalEstacionamentos: estacionamentos.length,
      });
    }

    // Opção 1: Manter histórico - salva snapshot e desvincula estacionamentos
    if (manterHistorico && estacionamentos.length > 0) {
      // Cria um "retrato" do veículo para referência futura
      const snapshot = {
        placa: veiculo.placa,
        modelo: veiculo.modelo,
        cor: veiculo.cor,
        clienteNome: veiculo.cliente.nome,
      };

      // Finaliza estacionamentos que ainda estão ativos
      const estacionamentosAtivos = await prisma.estacionamento.findMany({
        where: { veiculoId: id, horaSaida: null },
      });

      const agora = new Date();

      for (const est of estacionamentosAtivos) {
        const valorCalculado = calcularValor(est.horaEntrada, agora);
        await prisma.estacionamento.update({
          where: { id: est.id },
          data: { horaSaida: agora, valor: valorCalculado },
        });
      }

      // Desvincula o veículo e salva o snapshot em todos os estacionamentos
      const todosEstacionamentos = await prisma.estacionamento.findMany({
        where: { veiculoId: id },
      });

      for (const est of todosEstacionamentos) {
        await prisma.estacionamento.update({
          where: { id: est.id },
          data: {
            veiculoId: null as unknown as undefined,
            veiculoSnapshot: snapshot,
          },
        });
      }
    } else if (estacionamentos.length > 0) {
      // Opção 2: Deletar tudo - remove estacionamentos junto
      await prisma.estacionamento.deleteMany({ where: { veiculoId: id } });
    }

    // Finalmente, remove o veículo
    await veiculoService.remove(id);
    return res.status(200).json({
      message: manterHistorico
        ? "Veículo removido. Histórico de estacionamentos mantido."
        : "Veículo e estacionamentos removidos com sucesso.",
      id,
    });
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Veículo não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};
