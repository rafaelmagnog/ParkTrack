import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Erro capturado:", err);

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

  if (err.code === "P2025") {
    return res.status(404).json({
      message: "Recurso não encontrado",
      code: "NOT_FOUND",
    });
  }

  if (err.code === "P2002") {
    return res.status(409).json({
      message: "Violação de chave única (registro duplicado)",
      code: "CONFLICT",
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor",
    code: "INTERNAL_ERROR",
  });
};
