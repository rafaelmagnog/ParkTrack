/**
 * Schemas de validação para Cliente
 *
 * Define as regras de validação usando Zod para criação e
 * atualização de clientes. Também valida o parâmetro ID.
 */

import { z } from "zod";

// Schema para criação de cliente - todos os campos obrigatórios
export const createClienteSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  telefone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres")
    .max(15, "Telefone deve ter no máximo 15 caracteres"),
  cpf: z
    .string()
    .length(11, "CPF deve ter exatamente 11 dígitos")
    .regex(/^\d+$/, "CPF deve conter apenas números"),
});

// Schema para atualização - campos opcionais (partial)
export const updateClienteSchema = createClienteSchema.partial();

// Valida o parâmetro ID da URL (vem como string, converte para number)
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

// Tipos inferidos dos schemas para usar nos controllers/services
export type CreateClienteData = z.infer<typeof createClienteSchema>;
export type UpdateClienteData = z.infer<typeof updateClienteSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
