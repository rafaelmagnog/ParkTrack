/**
 * Middleware de tratamento global de erros
 *
 * Captura todos os erros que não foram tratados nos controllers
 * e retorna respostas padronizadas ao cliente.
 *
 * Também trata erros específicos do Prisma (P2025, P2002).
 */

import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log do erro para debug (aparece no console do servidor)
  console.error("Erro capturado:", err);

  // Erro de validação do Zod - dados inválidos enviados pelo cliente
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Erro de validação dos dados",
      code: "VALIDATION_ERROR",
      errors: err.issues.map((e) => ({
        campo: e.path.join("."),
        mensagem: e.message,
      })),
    });
  }

  // P2025 = registro não encontrado no Prisma
  if (err.code === "P2025") {
    return res.status(404).json({
      message: "Recurso não encontrado",
      code: "NOT_FOUND",
    });
  }

  // P2002 = violação de constraint unique no Prisma
  if (err.code === "P2002") {
    return res.status(409).json({
      message: "Violação de chave única (registro duplicado)",
      code: "CONFLICT",
    });
  }

  // Erro genérico - não sabemos o que aconteceu
  return res.status(500).json({
    message: "Erro interno do servidor",
    code: "INTERNAL_ERROR",
  });
};
