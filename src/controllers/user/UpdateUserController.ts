import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/user/UpdateUserService';

class UpdateUserController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.params; // Obtém `user_id` dos parâmetros da rota
        const { name, password, confirmPassword } = req.body;

        const updateUserService = new UpdateUserService();

        try {
            const updatedUser = await updateUserService.execute({
                userId: user_id,
                name,
                password,
                confirmPassword
            });

            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Erro na atualização do usuário:", error);
            return res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateUserController };
