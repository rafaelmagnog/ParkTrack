import { Request, Response, NextFunction } from "express";
import veiculoService from "../services/veiculoService";
import prisma from "../db/prisma";

const veiculoController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const veiculos = await veiculoService.getAll();
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
      const atualizado = await veiculoService.update(id, req.body);
      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await veiculoService.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

export default veiculoController;
