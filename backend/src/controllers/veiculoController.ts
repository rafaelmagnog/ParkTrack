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

      // Verificar se possui estacionamentos vinculados
      const estacionamentos = await prisma.estacionamento.findMany({
        where: { veiculoId: id },
        select: {
          id: true,
          horaEntrada: true,
          horaSaida: true,
          valor: true,
        },
      });

      // Se tem estacionamentos e não foi passado manterHistorico, retorna 409
      // para que o frontend exiba o modal de confirmação
      if (
        estacionamentos.length > 0 &&
        req.query.manterHistorico === undefined
      ) {
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
        // Criar snapshot do veículo para preservar dados após exclusão
        const snapshot = {
          placa: veiculo.placa,
          modelo: veiculo.modelo,
          cor: veiculo.cor,
          clienteNome: veiculo.cliente.nome,
        };

        const PRECO_POR_HORA = 10; // R$ 10,00 por hora

        // Função para calcular valor do estacionamento
        const calcularValor = (horaEntrada: Date, horaSaida: Date): number => {
          const diffMs = horaSaida.getTime() - horaEntrada.getTime();
          const diffHoras = diffMs / (1000 * 60 * 60);
          // Mínimo de 1 hora, arredondando para cima
          const horasCobranca = Math.max(1, Math.ceil(diffHoras));
          return horasCobranca * PRECO_POR_HORA;
        };

        // Buscar estacionamentos ativos para finalizar e calcular valor
        const estacionamentosAtivos = await prisma.estacionamento.findMany({
          where: { veiculoId: id, horaSaida: null },
        });

        const agora = new Date();

        // Finalizar estacionamentos ativos com valor calculado
        for (const est of estacionamentosAtivos) {
          const valorCalculado = calcularValor(est.horaEntrada, agora);
          await prisma.estacionamento.update({
            where: { id: est.id },
            data: { horaSaida: agora, valor: valorCalculado },
          });
        }

        // Atualizar todos os estacionamentos com o snapshot e remover veiculoId
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
