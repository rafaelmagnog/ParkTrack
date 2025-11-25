import { z } from "zod";
import { placaSchema, idSchema, MENSAGENS } from "./common";

export const createVeiculoSchema = z.object({
  placa: placaSchema,

  modelo: z
    .string({ error: MENSAGENS.obrigatorio("Modelo") })
    .min(1, MENSAGENS.obrigatorio("Modelo"))
    .min(2, MENSAGENS.minCaracteres("Modelo", 2))
    .max(80, MENSAGENS.maxCaracteres("Modelo", 80)),

  cor: z
    .string({ error: MENSAGENS.obrigatorio("Cor") })
    .min(1, MENSAGENS.obrigatorio("Cor"))
    .min(2, MENSAGENS.minCaracteres("Cor", 2))
    .max(40, MENSAGENS.maxCaracteres("Cor", 40)),

  clienteId: idSchema("cliente"),
});

export const updateVeiculoSchema = createVeiculoSchema.partial();

export type CreateVeiculoSchemaInput = z.infer<typeof createVeiculoSchema>;
export type UpdateVeiculoSchemaInput = z.infer<typeof updateVeiculoSchema>;
