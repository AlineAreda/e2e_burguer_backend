import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'Nome, e-mail, senha e confirmação de senha são obrigatórios.' });
        }

        if (!name || name.trim().split(' ').length < 2) {
            return res.status(400).json({ error: 'Preencha com nome e sobrenome.' });
        }

        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute({ 
                name,
                email,
                password,
                confirmPassword
            });

            return res.status(201).json(user);
        } catch (error) {
            console.error("Erro na criação do usuário:", error);

            if (error.message === 'E-mail já cadastrado.') {
                return res.status(409).json({ error: error.message });
            } else if (error.message === 'Formato de e-mail inválido.' || error.message.includes('Senha inválida')) {
                return res.status(400).json({ error: error.message });
            } else if (error.message === 'As senhas não coincidem.') {
                return res.status(400).json({ error: error.message });
            }

            return res.status(500).json({ error: "Erro interno no servidor." });
        }
    }
}

export { CreateUserController };
