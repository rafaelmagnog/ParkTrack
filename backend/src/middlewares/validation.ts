/**
 * Middlewares de validação usando Zod
 *
 * Valida os dados de entrada (body e params) antes de chegarem
 * aos controllers. Se a validação falhar, retorna 400 Bad Request
 * com detalhes dos erros.
 */

import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

/**
 * Valida o body da requisição contra um schema Zod.
 * O body validado substitui o original (já transformado/sanitizado).
 */
export const validateBody = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Substitui o body pelo resultado parseado (aplica transformações)
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Erro de validação",
          code: "VALIDATION_ERROR",
          errors: error.issues.map((e) => ({
            campo: e.path.join("."),
            mensagem: e.message,
          })),
        });
      }
      // Erro desconhecido - passa para o errorHandler
      next(error);
    }
  };
};

/**
 * Valida os parâmetros da URL (ex: /clientes/:id).
 * Útil para garantir que IDs são numéricos e positivos.
 */
export const validateParams = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Params vêm como string, o schema pode transformar para number
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Parâmetros inválidos",
          code: "VALIDATION_ERROR",
          errors: error.issues.map((e) => ({
            campo: e.path.join("."),
            mensagem: e.message,
          })),
        });
      }
      next(error);
    }
  };
};
