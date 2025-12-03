import { Request, Response } from "express";
import * as veiculoService from "../services/veiculoService";
import prisma from "../db/prisma";

const PRECO_POR_HORA = 10; // R$ 10,00 por hora

const calcularValor = (horaEntrada: Date, horaSaida: Date): number => {
  const diffMs = horaSaida.getTime() - horaEntrada.getTime();
  const diffHoras = diffMs / (1000 * 60 * 60);
  const horasCobranca = Math.max(1, Math.ceil(diffHoras));
  return horasCobranca * PRECO_POR_HORA;
};

export const getAllVeiculos = async (req: Request, res: Response) => {
  try {
    const veiculos = await veiculoService.getAll();
    return res.json(veiculos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

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

export const createVeiculo = async (req: Request, res: Response) => {
  try {
    const placaExiste = await prisma.veiculo.findUnique({
      where: { placa: req.body.placa.toUpperCase() },
    });
    if (placaExiste)
      return res.status(409).json({ message: "Placa já cadastrada" });

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

export const updateVeiculo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (req.body.placa) {
      const placaExiste = await prisma.veiculo.findFirst({
        where: { placa: req.body.placa.toUpperCase(), NOT: { id } },
      });
      if (placaExiste)
        return res.status(409).json({ message: "Placa já cadastrada" });
    }

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

export const deleteVeiculo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const manterHistorico = req.query.manterHistorico === "true";

    const veiculo = await prisma.veiculo.findUnique({
      where: { id },
      include: { cliente: { select: { nome: true } } },
    });

    if (!veiculo) {
      return res.status(404).json({ message: "Veículo não encontrado" });
    }

    const estacionamentos = await prisma.estacionamento.findMany({
      where: { veiculoId: id },
      select: { id: true, horaEntrada: true, horaSaida: true, valor: true },
    });

    // Se tem estacionamentos e não foi passado manterHistorico, retorna 409
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

    // Manter histórico: salvar snapshot e desvincular estacionamentos
    if (manterHistorico && estacionamentos.length > 0) {
      const snapshot = {
        placa: veiculo.placa,
        modelo: veiculo.modelo,
        cor: veiculo.cor,
        clienteNome: veiculo.cliente.nome,
      };

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
      await prisma.estacionamento.deleteMany({ where: { veiculoId: id } });
    }

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
