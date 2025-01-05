import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, confirmPassword, isGestao } = req.body;

    if (isGestao === undefined) {
      return res.status(400).json({ error: 'O perfil (isGestao) é obrigatório.' });
    }

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        name,
        email,
        password,
        confirmPassword,
        isGestao,
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro na criação do usuário:", error);

      if (error.message === 'E-mail já cadastrado.') {
        return res.status(409).json({ error: error.message });
      }

      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };
