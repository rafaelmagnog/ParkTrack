import { Request, Response, NextFunction } from "express";
import estacionamentoService from "../services/estacionamentoService";
import prisma from "../db/prisma";

const estacionamentoController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const lista = await estacionamentoService.getAll();
      res.json(lista);
    } catch (err) {
      next(err);
    }
  },

  async getDetailed(req: Request, res: Response, next: NextFunction) {
    try {
      const lista = await estacionamentoService.getDetailed();
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

      const novo = await estacionamentoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
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
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

export default estacionamentoController;
