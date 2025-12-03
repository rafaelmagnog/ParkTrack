/**
 * Controller de Estacionamentos
 *
 * Gerencia o registro de entradas e saídas de veículos no estacionamento.
 * É o core do sistema - controla o fluxo de veículos e calcula valores.
 */

import { Request, Response } from "express";
import * as estacionamentoService from "../services/estacionamentoService";
import prisma from "../db/prisma";

/**
 * Retorna todos os registros de estacionamento
 * GET /estacionamentos
 */
export const getAllEstacionamentos = async (req: Request, res: Response) => {
  try {
    const lista = await estacionamentoService.getDetailed();
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Retorna estacionamentos com dados detalhados (veículo + cliente)
 * GET /estacionamentos/detalhado
 */
export const getEstacionamentoDetalhado = async (
  req: Request,
  res: Response
) => {
  try {
    const lista = await estacionamentoService.getDetailed();
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Busca um registro de estacionamento pelo ID
 * GET /estacionamentos/:id
 */
export const getEstacionamentoById = async (req: Request, res: Response) => {
  try {
    const registro = await estacionamentoService.getById(Number(req.params.id));
    if (!registro)
      return res.status(404).json({ message: "Estacionamento não encontrado" });
    return res.json(registro);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Registra a entrada de um veículo no estacionamento
 * POST /estacionamentos
 *
 * Validações:
 * - Veículo deve existir
 * - Veículo não pode já estar estacionado (sem saída registrada)
 */
export const createEstacionamento = async (req: Request, res: Response) => {
  try {
    // Verifica se o veículo existe
    const veiculoExiste = await prisma.veiculo.findUnique({
      where: { id: req.body.veiculoId },
    });
    if (!veiculoExiste)
      return res.status(404).json({ message: "Veículo não encontrado" });

    // Verifica se o veículo já está estacionado (entrada sem saída)
    const veiculoEstacionado = await prisma.estacionamento.findFirst({
      where: { veiculoId: req.body.veiculoId, horaSaida: null },
    });
    if (veiculoEstacionado) {
      return res.status(409).json({
        message: "Veículo já está estacionado",
        estacionamentoAtivoId: veiculoEstacionado.id,
        horaEntrada: veiculoEstacionado.horaEntrada,
      });
    }

    const novo = await estacionamentoService.create(req.body);
    return res.status(201).json(novo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Atualiza um registro de estacionamento (geralmente para registrar saída)
 * PUT /estacionamentos/:id
 *
 * Valida se a hora de saída não é anterior à hora de entrada.
 */
export const updateEstacionamento = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // Validação: horaSaida não pode ser antes de horaEntrada
    if (req.body.horaSaida) {
      const estacionamento = await prisma.estacionamento.findUnique({
        where: { id },
      });
      if (estacionamento) {
        const horaEntrada = new Date(estacionamento.horaEntrada);
        const horaSaida = new Date(req.body.horaSaida);
        // Ignora segundos na comparação para evitar problemas de arredondamento
        horaEntrada.setSeconds(0, 0);
        horaSaida.setSeconds(0, 0);
        if (horaSaida < horaEntrada) {
          return res.status(400).json({
            message: "Hora de saída deve ser posterior à hora de entrada",
          });
        }
      }
    }

    const atualizado = await estacionamentoService.update(id, req.body);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Estacionamento não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Remove um registro de estacionamento
 * DELETE /estacionamentos/:id
 */
export const deleteEstacionamento = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await estacionamentoService.remove(id);
    return res
      .status(200)
      .json({ message: "Estacionamento removido com sucesso", id });
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Estacionamento não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};
