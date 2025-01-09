import { Request, Response, NextFunction } from "express";

export function isGestaoAuthenticated(req: Request, res: Response, next: NextFunction) {
  // Verifica se o usuário tem o perfil 'isGestao'
  if (!req.isGestao) {
    return res.status(403).json({ error: "Acesso restrito a usuários de gestão." });
  }

  return next();
}
