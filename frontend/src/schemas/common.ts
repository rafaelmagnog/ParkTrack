/**
 * Schemas e mensagens de validação comuns
 */

import { z } from "zod";

// Mensagens de erro padrão
export const MENSAGENS = {
  obrigatorio: (campo: string) => `${campo} é obrigatório`,
  minCaracteres: (campo: string, min: number) =>
    `${campo} deve ter pelo menos ${min} caracteres`,
  maxCaracteres: (campo: string, max: number) =>
    `${campo} deve ter no máximo ${max} caracteres`,
  apenasNumeros: (campo: string) => `${campo} deve conter apenas números`,
  selecione: (campo: string) => `Selecione um ${campo}`,
  invalido: (campo: string) => `${campo} inválido`,
};

// ============ Schemas reutilizáveis ============

/** CPF - remove máscaras e valida 11 dígitos */
export const cpfSchema = z
  .string({ error: MENSAGENS.obrigatorio("CPF") })
  .min(1, MENSAGENS.obrigatorio("CPF"))
  .transform((v) => v.replace(/\D/g, "")) // Remove tudo que não é número
  .refine((v) => v.length === 11, "CPF deve ter 11 dígitos");

/** Telefone - remove máscaras, aceita 10 ou 11 dígitos */
export const telefoneSchema = z
  .string({ error: MENSAGENS.obrigatorio("Telefone") })
  .min(1, MENSAGENS.obrigatorio("Telefone"))
  .transform((v) => v.replace(/\D/g, ""))
  .refine(
    (v) => v.length >= 10 && v.length <= 11,
    "Telefone deve ter 10 ou 11 dígitos"
  );

/** Placa do veículo - converte para maiúsculas */
export const placaSchema = z
  .string({ error: MENSAGENS.obrigatorio("Placa") })
  .min(1, MENSAGENS.obrigatorio("Placa"))
  .min(7, "Placa deve ter 7 caracteres")
  .max(8, "Placa deve ter no máximo 8 caracteres")
  .transform((v) => v.toUpperCase());

/** Nome genérico - usado para clientes */
export const nomeSchema = z
  .string({ error: MENSAGENS.obrigatorio("Nome") })
  .min(1, MENSAGENS.obrigatorio("Nome"))
  .min(2, MENSAGENS.minCaracteres("Nome", 2))
  .max(100, MENSAGENS.maxCaracteres("Nome", 100));

/**
 * Schema para IDs numéricos (relacionamentos).
 * Usa coerce para converter string de select para number.
 */
export const idSchema = (campo: string) =>
  z.coerce
    .number({ error: MENSAGENS.selecione(campo) })
    .int(MENSAGENS.selecione(campo))
    .positive(MENSAGENS.selecione(campo));
