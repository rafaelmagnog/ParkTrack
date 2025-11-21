import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validateBody = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
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
      next(error);
    }
  };
};

export const validateParams = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
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
