import { z } from "zod";

export const veiculoSchema = z.object({
  placa: z.string().min(4),
  modelo: z.string().min(2),
  cor: z.string().min(2),
  clienteId: z.number().int().positive(),
});

export const veiculoUpdateSchema = veiculoSchema.partial();
