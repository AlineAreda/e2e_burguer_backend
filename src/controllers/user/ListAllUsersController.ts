import { Request, Response } from "express";
import { ListAllUsersService } from "../../services/user/ListAllUsersService";

class ListAllUsersController {
  async handle(req: Request, res: Response) {
    const listAllUsersService = new ListAllUsersService();

    try {
      const users = await listAllUsersService.execute();
      return res.status(200).json(users); // Retorna a lista de usuários com sucesso
    } catch (error) {
      console.error("Erro ao listar todos os usuários:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { ListAllUsersController };
