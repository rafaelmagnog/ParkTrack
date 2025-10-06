import { Request, Response } from "express";
import veiculoService from "../services/veiculoService";
import { veiculoSchema, veiculoUpdateSchema } from "../schemas/veiculoSchema";
import prisma from "../db/prisma";

const veiculoController = {
  async getAll(req: Request, res: Response) {
    const list = await veiculoService.getAll();
    return res.json(list);
  },

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "ID inválido" });
    const v = await veiculoService.getById(id);
    if (!v) return res.status(404).json({ message: "Veículo não encontrado" });
    return res.json(v);
  },

  async create(req: Request, res: Response) {
    const parsed = veiculoSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });

    // verifica cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id: parsed.data.clienteId },
    });
    if (!cliente)
      return res
        .status(404)
        .json({ message: "Cliente referenciado não existe" });

    try {
      const novo = await veiculoService.create(parsed.data);
      return res.status(201).json(novo);
    } catch (err: any) {
      return res
        .status(409)
        .json({ message: err.message || "Erro ao criar veículo" });
    }
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const parsed = veiculoUpdateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });
    try {
      const updated = await veiculoService.update(id, parsed.data);
      return res.json(updated);
    } catch (err: any) {
      return res
        .status(404)
        .json({ message: err.message || "Veículo não encontrado" });
    }
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await veiculoService.remove(id);
      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(404)
        .json({ message: err.message || "Veículo não encontrado" });
    }
  },
};

export default veiculoController;
