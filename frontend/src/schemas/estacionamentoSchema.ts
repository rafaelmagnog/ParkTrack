import { z } from "zod";
import { idSchema } from "./common";

export const createEstacionamentoSchema = z.object({
  veiculoId: idSchema("veículo"),
});

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

export type CreateEstacionamentoSchemaInput = z.infer<
  typeof createEstacionamentoSchema
>;
export type UpdateEstacionamentoSchemaInput = z.infer<
  typeof updateEstacionamentoSchema
>;
