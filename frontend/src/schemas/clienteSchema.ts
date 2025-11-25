import { z } from "zod";
import { nomeSchema, telefoneSchema, cpfSchema } from "./common";

export const createClienteSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  cpf: cpfSchema,
});

export const updateClienteSchema = createClienteSchema.partial();

export type CreateClienteSchemaInput = z.infer<typeof createClienteSchema>;
export type UpdateClienteSchemaInput = z.infer<typeof updateClienteSchema>;
