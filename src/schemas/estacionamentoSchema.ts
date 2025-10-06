import { z } from "zod";

export const estacionamentoCreateSchema = z.object({
  veiculoId: z.number().int().positive(),
});

export const estacionamentoUpdateSchema = z.object({
  horaSaida: z.string().optional(),
  valor: z.number().optional(),
});
