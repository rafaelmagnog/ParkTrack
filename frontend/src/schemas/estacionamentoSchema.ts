/**
 * Schema de validação para Estacionamento (frontend)
 *
 * Criação só precisa do veiculoId (registro de entrada).
 * Atualização valida horaSaida e valor (finalização).
 */

import { z } from "zod";
import { idSchema } from "./common";

// Schema para criação (entrada) - só precisa do veículo
export const createEstacionamentoSchema = z.object({
  veiculoId: idSchema("veículo"),
});

// Schema para atualização (finalização) - horaSaida e valor opcionais
export const updateEstacionamentoSchema = z.object({
  horaSaida: z
    .string()
    .datetime({ message: "Data/hora de saída inválida" })
    .refine((date) => new Date(date) <= new Date(), {
      message: "Data/hora não pode ser no futuro",
    })
    .optional(),
  valor: z.coerce
    .number({ error: "Valor deve ser um número" })
    .min(0, "Valor não pode ser negativo")
    .optional(),
});

// Tipos inferidos para formulários
export type CreateEstacionamentoSchemaInput = z.infer<
  typeof createEstacionamentoSchema
>;
export type UpdateEstacionamentoSchemaInput = z.infer<
  typeof updateEstacionamentoSchema
>;
