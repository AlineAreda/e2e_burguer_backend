import { Request, Response } from "express";
import { RemoveUserByEmailService } from '../../services/user/RemoveUserByEmailService';

class RemoveUserByEmailController {
  async handle(req: Request, res: Response) {
    const email = String(req.query.email || "");

    if (!email) {
      return res.status(400).json({ error: "Email do usuário é necessário." });
    }

    const removeUserByEmailService = new RemoveUserByEmailService();

    try {
      const result = await removeUserByEmailService.execute({ email });
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Erro ao excluir o usuário por email:", error);

      if (error.message === "Usuário não encontrado.") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { RemoveUserByEmailController };