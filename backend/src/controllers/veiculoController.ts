import { Request, Response, NextFunction } from "express";
import veiculoService from "../services/veiculoService";
import prisma from "../db/prisma";

const veiculoController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const veiculos = await veiculoService.getAll();
      if (!veiculos.length) {
        return res
          .status(404)
          .json({ message: "Nenhum veículo cadastrado ainda" });
      }
      res.json(veiculos);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const veiculo = await veiculoService.getById(id);
      if (!veiculo)
        return res.status(404).json({ message: "Veículo não encontrado" });
      res.json(veiculo);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
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
      res.status(201).json(veiculo);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
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
      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const manterHistorico = req.query.manterHistorico === "true";

      // Buscar dados do veículo para o snapshot
      const veiculo = await prisma.veiculo.findUnique({
        where: { id },
        include: { cliente: { select: { nome: true } } },
      });

      if (!veiculo) {
        return res.status(404).json({ message: "Veículo não encontrado" });
      }

      if (manterHistorico) {
        // Criar snapshot do veículo
        const snapshot = {
          placa: veiculo.placa,
          modelo: veiculo.modelo,
          cor: veiculo.cor,
          clienteNome: veiculo.cliente.nome,
        };

        // Atualizar estacionamentos: salvar snapshot, remover vínculo, finalizar ativos
        await prisma.estacionamento.updateMany({
          where: { veiculoId: id, horaSaida: null },
          data: { horaSaida: new Date() },
        });

        // Atualizar todos os estacionamentos com o snapshot e remover veiculoId
        const estacionamentos = await prisma.estacionamento.findMany({
          where: { veiculoId: id },
        });

        for (const est of estacionamentos) {
          await prisma.estacionamento.update({
            where: { id: est.id },
            data: {
              veiculoId: null as unknown as undefined,
              veiculoSnapshot: snapshot,
            },
          });
        }
      } else {
        // Deletar todos os estacionamentos vinculados
        await prisma.estacionamento.deleteMany({
          where: { veiculoId: id },
        });
      }

      // Deletar o veículo
      await veiculoService.remove(id);
      res.status(200).json({
        message: manterHistorico
          ? "Veículo removido. Histórico de estacionamentos mantido."
          : "Veículo e estacionamentos removidos com sucesso.",
        id,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default veiculoController;
