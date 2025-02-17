import { Request, Response } from "express";
import { RemoveUserService } from '../../services/user/RemoveUserService';

class RemoveUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.query.user_id as string;

        if (!user_id) {
            return res.status(400).json({ error: "ID do usuário é necessário." });
        }

        const removeUserService = new RemoveUserService();

        try {
            const result = await removeUserService.execute({ user_id });
            return res.status(204).json(result); //return res.status(200).json(result); -> correto
        } catch (error) {
            console.error("Erro ao excluir o usuário:", error);

            if (error.message === "Usuário não encontrado.") {
                return res.status(404).json({ error: error.message });
            }

            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { RemoveUserController };




