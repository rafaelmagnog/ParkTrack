/**
 * Schema de validação para Cliente (frontend)
 *
 * Usa os schemas comuns (nome, telefone, cpf) para
 * validar formulários de criação e edição.
 */

import { z } from "zod";
import { nomeSchema, telefoneSchema, cpfSchema } from "./common";

// Schema para criação - todos obrigatórios
export const createClienteSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  cpf: cpfSchema,
});

// Schema para atualização - todos opcionais
export const updateClienteSchema = createClienteSchema.partial();

// Tipos inferidos para formulários
export type CreateClienteSchemaInput = z.infer<typeof createClienteSchema>;
export type UpdateClienteSchemaInput = z.infer<typeof updateClienteSchema>;
