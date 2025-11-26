import { Request, Response, NextFunction } from "express";
import clienteService from "../services/clienteService";
import prisma from "../db/prisma";

const clienteController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const clientes = await clienteService.getAll();
      if (!clientes.length) {
        return res
          .status(404)
          .json({ message: "Nenhum cliente cadastrado ainda" });
      }
      res.json(clientes);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const cliente = await clienteService.getById(id);
      if (!cliente)
        return res.status(404).json({ message: "Cliente não encontrado" });
      res.json(cliente);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const existe = await prisma.cliente.findUnique({
        where: { cpf: req.body.cpf },
      });
      if (existe) return res.status(409).json({ message: "CPF já cadastrado" });

      const novo = await clienteService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (req.body.cpf) {
        const cpfExiste = await prisma.cliente.findFirst({
          where: { cpf: req.body.cpf, NOT: { id } },
        });
        if (cpfExiste)
          return res.status(409).json({ message: "CPF já cadastrado" });
      }

      const atualizado = await clienteService.update(id, req.body);
      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      // Verificar se o cliente possui veículos vinculados
      const veiculosVinculados = await prisma.veiculo.findMany({
        where: { clienteId: id },
        select: {
          id: true,
          placa: true,
          modelo: true,
          cor: true,
          estacionamentos: {
            select: {
              id: true,
              horaEntrada: true,
              horaSaida: true,
              valor: true,
            },
          },
        },
      });

      if (veiculosVinculados.length > 0) {
        // Contar total de estacionamentos
        const totalEstacionamentos = veiculosVinculados.reduce(
          (acc, v) => acc + v.estacionamentos.length,
          0
        );

        return res.status(409).json({
          message: "Cliente possui veículos vinculados",
          veiculos: veiculosVinculados,
          totalEstacionamentos,
        });
      }

      await clienteService.remove(id);
      res.status(200).json({ message: "Cliente removido com sucesso", id });
    } catch (err) {
      next(err);
    }
  },
};

export default clienteController;
