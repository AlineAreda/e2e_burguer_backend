import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization;

    // Verifica se o token de autenticação está presente
    if (!authToken) {
        return res.status(401).json({ error: "Acesso Negado. Realize login" });
    }

    const [, token] = authToken.split(' ');

    try {
        // Verifica o token JWT
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        // Define o ID do usuário no objeto `req` para acesso posterior
        req.user_id = sub;

        console.log('User ID from token:', req.user_id); // Verificação

        return next();
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ error: "Acesso Negado. Realize login" });
    }
}
