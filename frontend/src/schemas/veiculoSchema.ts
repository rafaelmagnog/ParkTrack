/**
 * Schema de validação para Veículo (frontend)
 *
 * Valida placa, modelo, cor e clienteId.
 * Placa é convertida para maiúsculas automaticamente.
 */

import { z } from "zod";
import { placaSchema, idSchema, MENSAGENS } from "./common";

// Schema para criação - todos obrigatórios
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

  // ID do cliente dono do veículo
  clienteId: idSchema("cliente"),
});

// Schema para atualização - todos opcionais
export const updateVeiculoSchema = createVeiculoSchema.partial();

// Tipos inferidos para formulários
export type CreateVeiculoSchemaInput = z.infer<typeof createVeiculoSchema>;
export type UpdateVeiculoSchemaInput = z.infer<typeof updateVeiculoSchema>;
