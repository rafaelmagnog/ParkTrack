/**
 * Funções de validação
 * Wrappers dos schemas Zod com retorno {success, data/errors}.
 */

import { z } from "zod";
import { createClienteSchema, updateClienteSchema } from "./clienteSchema";
import { createVeiculoSchema, updateVeiculoSchema } from "./veiculoSchema";
import {
  createEstacionamentoSchema,
  updateEstacionamentoSchema,
} from "./estacionamentoSchema";

// Tipos para resultado de validação
type ValidationSuccess<T> = { success: true; data: T };
type ValidationError = { success: false; errors: Record<string, string> };
type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

/**
 * Validador genérico usando safeParse (sem exceptions).
 * Retorna objeto com success e data/errors conforme resultado.
 */
function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  // Mapeia erros para objeto campo -> mensagem
  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const key = String(issue.path[0] ?? "_root");
    // Só guarda o primeiro erro de cada campo
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  });

  return { success: false, errors };
}

// ============ Validadores de Cliente ============
export const validateCreateCliente = (data: unknown) =>
  validate(createClienteSchema, data);

export const validateUpdateCliente = (data: unknown) =>
  validate(updateClienteSchema, data);

// ============ Validadores de Veiculo ============
export const validateCreateVeiculo = (data: unknown) =>
  validate(createVeiculoSchema, data);

export const validateUpdateVeiculo = (data: unknown) =>
  validate(updateVeiculoSchema, data);

// ============ Validadores de Estacionamento ============
export const validateCreateEstacionamento = (data: unknown) =>
  validate(createEstacionamentoSchema, data);

export const validateUpdateEstacionamento = (data: unknown) =>
  validate(updateEstacionamentoSchema, data);

/**
 * Valida um único campo do schema.
 * Útil para validação em tempo real enquanto digita.
 */
export const validateField = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  fieldName: string,
  value: unknown
): string => {
  const fieldSchema = schema.shape[fieldName as keyof T] as unknown;
  if (!fieldSchema) return "";

  const result = (fieldSchema as z.ZodTypeAny).safeParse(value);
  if (result.success) return "";

  return result.error.issues[0]?.message ?? "Valor inválido";
};

// Re-exporta schemas para quem precisar diretamente
export {
  createClienteSchema,
  updateClienteSchema,
  createVeiculoSchema,
  updateVeiculoSchema,
  createEstacionamentoSchema,
  updateEstacionamentoSchema,
};
