/**
 * Schemas de validação para Veículo
 *
 * Define as regras de validação usando Zod para criação e
 * atualização de veículos. Cada veículo pertence a um cliente.
 */

import { z } from "zod";

// Schema para criação - todos os campos obrigatórios
export const createVeiculoSchema = z.object({
  placa: z
    .string()
    .min(4, "Placa deve ter pelo menos 4 caracteres")
    .max(8, "Placa deve ter no máximo 8 caracteres"),
  modelo: z
    .string()
    .min(2, "Modelo deve ter pelo menos 2 caracteres")
    .max(80, "Modelo deve ter no máximo 80 caracteres"),
  cor: z
    .string()
    .min(2, "Cor deve ter pelo menos 2 caracteres")
    .max(40, "Cor deve ter no máximo 40 caracteres"),
  // Relacionamento com cliente - obrigatório
  clienteId: z
    .number()
    .int("clienteId deve ser um número inteiro")
    .positive("clienteId deve ser positivo"),
});

// Schema para atualização - todos os campos opcionais
export const updateVeiculoSchema = createVeiculoSchema.partial();

// Validação do parâmetro ID na URL
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

// Tipos inferidos para tipagem forte nos controllers
export type CreateVeiculoData = z.infer<typeof createVeiculoSchema>;
export type UpdateVeiculoData = z.infer<typeof updateVeiculoSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
