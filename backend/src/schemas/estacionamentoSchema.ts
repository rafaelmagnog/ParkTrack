import { z } from "zod";

export const createEstacionamentoSchema = z.object({
  veiculoId: z
    .number()
    .int("veiculoId deve ser um número inteiro")
    .positive("veiculoId deve ser positivo"),
});

export const updateEstacionamentoSchema = z.object({
  horaSaida: z
    .string()
    .refine((date) => {
      if (!date) return true;
      const d = new Date(date);
      return !isNaN(d.getTime());
    }, "horaSaida deve ser uma data/hora válida")
    .optional(),
  valor: z.number().min(0, "valor não pode ser negativo").optional(),
});

export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

export type CreateEstacionamentoData = z.infer<
  typeof createEstacionamentoSchema
>;
export type UpdateEstacionamentoData = z.infer<
  typeof updateEstacionamentoSchema
>;
export type IdParam = z.infer<typeof idParamSchema>;
