
import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
    async handle(req: Request, res: Response) {
        const detailUserService = new DetailUserService();

        try {
          const user_id = req.user_id;; // userId é preenchido pelo middleware isAuthenticated

            const user = await detailUserService.execute(user_id);

            return res.json(user); // Retorna os dados do usuário, incluindo isGestao
        } catch (error) {
            console.error("Erro ao buscar os detalhes do usuário:", error);

            if (error.message === 'Usuário não encontrado.') {
                return res.status(404).json({ error: error.message });
            }

            return res.status(500).json({ error: "Erro interno no servidor." });
        }
    }
}

export { DetailUserController };
