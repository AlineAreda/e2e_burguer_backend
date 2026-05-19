import { Request, Response } from "express";
import { DetailUserByEmailService } from '../../services/user/DetailUserByEmailService';

class DetailUserByEmailController {
  async handle(req: Request, res: Response) {
    const email = String(req.query.email || "");

    if (!email) {
      return res.status(400).json({ error: "Email do usuário é necessário." });
    }

    const detailUserByEmailService = new DetailUserByEmailService();

    try {
      const user = await detailUserByEmailService.execute(email);
      return res.status(200).json(user);
    } catch (error: any) {
      console.error("Erro ao buscar detalhes do usuário por email:", error);

      if (error.message === "Usuário não encontrado.") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}

export { DetailUserByEmailController };