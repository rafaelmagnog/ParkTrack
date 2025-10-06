import { z } from "zod";

export const clienteSchema = z.object({
  nome: z.string().min(2),
  telefone: z.string().min(8),
  cpf: z.string().length(11),
});

export const clienteUpdateSchema = clienteSchema.partial();
