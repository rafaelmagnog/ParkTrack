import { Request, Response } from "express";
import clienteService from "../services/clienteService";
import { clienteSchema, clienteUpdateSchema } from "../schemas/clienteSchema";

const clienteController = {
  async getAll(req: Request, res: Response) {
    const list = await clienteService.getAll();
    return res.json(list);
  },

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "ID inválido" });
    const cliente = await clienteService.getById(id);
    if (!cliente)
      return res.status(404).json({ message: "Cliente não encontrado" });
    return res.json(cliente);
  },

  async create(req: Request, res: Response) {
    const parsed = clienteSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });
    try {
      const novo = await clienteService.create(parsed.data);
      return res.status(201).json(novo);
    } catch (err: any) {
      return res
        .status(409)
        .json({ message: err.message || "Erro ao criar cliente" });
    }
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const parsed = clienteUpdateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });
    try {
      const updated = await clienteService.update(id, parsed.data);
      return res.json(updated);
    } catch (err: any) {
      return res
        .status(404)
        .json({ message: err.message || "Cliente não encontrado" });
    }
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await clienteService.remove(id);
      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(404)
        .json({ message: err.message || "Cliente não encontrado" });
    }
  },
};

export default clienteController;
