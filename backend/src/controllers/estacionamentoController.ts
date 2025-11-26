import { Request, Response, NextFunction } from "express";
import estacionamentoService from "../services/estacionamentoService";
import prisma from "../db/prisma";

const estacionamentoController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Usa getDetailed para incluir dados do veículo e cliente
      const lista = await estacionamentoService.getDetailed();
      if (!lista.length) {
        return res
          .status(404)
          .json({ message: "Nenhum registro de estacionamento encontrado" });
      }
      res.json(lista);
    } catch (err) {
      next(err);
    }
  },

  async getDetailed(req: Request, res: Response, next: NextFunction) {
    try {
      const lista = await estacionamentoService.getDetailed();
      if (!lista.length) {
        return res.status(404).json({
          message: "Nenhum registro detalhado de estacionamento disponível",
        });
      }
      res.json(lista);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const registro = await estacionamentoService.getById(id);
      if (!registro)
        return res
          .status(404)
          .json({ message: "Registro de estacionamento não encontrado" });
      res.json(registro);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const veiculoExiste = await prisma.veiculo.findUnique({
        where: { id: req.body.veiculoId },
      });
      if (!veiculoExiste)
        return res.status(404).json({ message: "Veículo não encontrado" });

      // Verificar se veículo já está estacionado (sem horaSaida)
      const veiculoEstacionado = await prisma.estacionamento.findFirst({
        where: {
          veiculoId: req.body.veiculoId,
          horaSaida: null,
        },
      });
      if (veiculoEstacionado) {
        return res.status(409).json({
          message: "Veículo já está estacionado",
          estacionamentoAtivoId: veiculoEstacionado.id,
        });
      }

      const novo = await estacionamentoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      // Validar horaSaida > horaEntrada
      if (req.body.horaSaida) {
        const estacionamento = await prisma.estacionamento.findUnique({
          where: { id },
        });
        if (estacionamento) {
          const horaEntrada = new Date(estacionamento.horaEntrada);
          const horaSaida = new Date(req.body.horaSaida);
          if (horaSaida <= horaEntrada) {
            return res.status(400).json({
              message: "Hora de saída deve ser posterior à hora de entrada",
            });
          }
        }
      }

      const atualizado = await estacionamentoService.update(id, req.body);
      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await estacionamentoService.remove(id);
      res
        .status(200)
        .json({ message: "Estacionamento removido com sucesso", id });
    } catch (err) {
      next(err);
    }
  },
};

export default estacionamentoController;
