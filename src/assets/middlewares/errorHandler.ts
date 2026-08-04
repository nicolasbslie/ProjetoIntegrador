import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Token inválido.",
    });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expirado.",
    });
  }

  return res.status(error.status || 500).json({
    message: error.message || "Erro interno do servidor.",
  });
};