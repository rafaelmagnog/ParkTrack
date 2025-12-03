/**
 * Schemas de validação para Estacionamento
 *
 * Define as regras para registro de entrada e saída de veículos.
 * Na criação só precisa do veiculoId (entrada).
 * Na atualização, define horaSaida e valor (finalização).
 */

import { z } from "zod";

// Schema para criar registro de entrada - só precisa do veículo
export const createEstacionamentoSchema = z.object({
  veiculoId: z
    .number()
    .int("veiculoId deve ser um número inteiro")
    .positive("veiculoId deve ser positivo"),
});

// Schema para atualização (finalizar) - horaSaida e valor opcionais
export const updateEstacionamentoSchema = z.object({
  horaSaida: z
    .string()
    .refine((date) => {
      // Valida se é uma data válida quando fornecida
      if (!date) return true;
      const d = new Date(date);
      return !isNaN(d.getTime());
    }, "horaSaida deve ser uma data/hora válida")
    .optional(),
  valor: z.number().min(0, "valor não pode ser negativo").optional(),
});

// Validação do parâmetro ID
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

// Tipos para usar nos controllers e services
export type CreateEstacionamentoData = z.infer<
  typeof createEstacionamentoSchema
>;
export type UpdateEstacionamentoData = z.infer<
  typeof updateEstacionamentoSchema
>;
export type IdParam = z.infer<typeof idParamSchema>;
