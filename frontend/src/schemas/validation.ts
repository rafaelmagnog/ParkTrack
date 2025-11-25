import { z } from "zod";
import { createClienteSchema, updateClienteSchema } from "./clienteSchema";
import { createVeiculoSchema, updateVeiculoSchema } from "./veiculoSchema";
import {
  createEstacionamentoSchema,
  updateEstacionamentoSchema,
} from "./estacionamentoSchema";

type ValidationSuccess<T> = { success: true; data: T };
type ValidationError = { success: false; errors: Record<string, string> };
type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

// Validador genérico usando safeParse (sem exceptions)

function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const key = String(issue.path[0] ?? "_root");
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  });

  return { success: false, errors };
}

// Validadores de Cliente
export const validateCreateCliente = (data: unknown) =>
  validate(createClienteSchema, data);

export const validateUpdateCliente = (data: unknown) =>
  validate(updateClienteSchema, data);

// Validadores de Veiculo
export const validateCreateVeiculo = (data: unknown) =>
  validate(createVeiculoSchema, data);

export const validateUpdateVeiculo = (data: unknown) =>
  validate(updateVeiculoSchema, data);

// Validadores de Estacionamento
export const validateCreateEstacionamento = (data: unknown) =>
  validate(createEstacionamentoSchema, data);

export const validateUpdateEstacionamento = (data: unknown) =>
  validate(updateEstacionamentoSchema, data);

// Validador de campo individual

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

export {
  createClienteSchema,
  updateClienteSchema,
  createVeiculoSchema,
  updateVeiculoSchema,
  createEstacionamentoSchema,
  updateEstacionamentoSchema,
};
