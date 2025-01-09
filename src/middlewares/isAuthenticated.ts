import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string; // ID do usuário
  isGestao: boolean; // Perfil do usuário
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  // Verifica se o token de autenticação está presente
  if (!authToken) {
    return res.status(401).json({ error: "Acesso Negado. Realize login" });
  }

  const [, token] = authToken.split(" ");

  try {
    // Verifica e decodifica o token JWT
    const decodedToken = verify(token, process.env.JWT_SECRET) as Payload;

    // Define o ID do usuário e o perfil no objeto `req` para acesso posterior
    req.user_id = decodedToken.sub;
    req.isGestao = decodedToken.isGestao;

    console.log("User ID from token:", req.user_id);
    console.log("User isGestao:", req.isGestao);

    return next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ error: "Acesso Negado. Realize login" });
  }
}
