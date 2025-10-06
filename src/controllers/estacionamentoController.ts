import { Request, Response } from "express";
import estacionamentoService from "../services/estacionamentoService";
import {
  estacionamentoCreateSchema,
  estacionamentoUpdateSchema,
} from "../schemas/estacionamentoSchema";
import prisma from "../db/prisma";

const estacionamentoController = {
  async getAll(req: Request, res: Response) {
    const list = await estacionamentoService.getAll();
    return res.json(list);
  },

  async getDetailed(req: Request, res: Response) {
    const list = await estacionamentoService.getDetailed();
    return res.json(list);
  },

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "ID inválido" });
    const item = await estacionamentoService.getById(id);
    if (!item)
      return res.status(404).json({ message: "Registro não encontrado" });
    return res.json(item);
  },

  async create(req: Request, res: Response) {
    const parsed = estacionamentoCreateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });

    // verifica veículo existe
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: parsed.data.veiculoId },
    });
    if (!veiculo)
      return res.status(404).json({ message: "Veículo não encontrado" });

    const novo = await estacionamentoService.create(parsed.data);
    return res.status(201).json(novo);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const parsed = estacionamentoUpdateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });

    // transforma horaSaida em Date se enviada
    const updateData: any = {};
    if (parsed.data.horaSaida)
      updateData.horaSaida = new Date(parsed.data.horaSaida);
    if (parsed.data.valor !== undefined) updateData.valor = parsed.data.valor;

    try {
      const updated = await estacionamentoService.update(id, updateData);
      return res.json(updated);
    } catch (err: any) {
      return res
        .status(404)
        .json({ message: err.message || "Registro não encontrado" });
    }
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await estacionamentoService.remove(id);
      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(404)
        .json({ message: err.message || "Registro não encontrado" });
    }
  },
};

export default estacionamentoController;
