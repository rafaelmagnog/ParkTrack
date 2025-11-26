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

      // Primeiro, deleta todos os estacionamentos vinculados ao veículo
      await prisma.estacionamento.deleteMany({
        where: { veiculoId: id },
      });

      // Depois, deletar o veículo
      await veiculoService.remove(id);
      res.status(200).json({ message: "Veículo removido com sucesso", id });
    } catch (err) {
      next(err);
    }
  },
};

export default veiculoController;
