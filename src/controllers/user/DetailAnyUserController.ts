import { Request, Response } from "express";
import { DetailAnyUserService } from "../../services/user/DetailAnyUserService";
import prismaClient from "../../prisma";

class DetailAnyUserController {
  async handle(req: Request, res: Response) {
    const { id: targetUserId } = req.params;
    const loggedUserId = req.user_id;

    try {
      const loggedUser = await prismaClient.user.findUnique({
        where: { id: loggedUserId },
        select: { isGestao: true },
      });

      if (!loggedUser || !loggedUser.isGestao) {
        return res.status(403).json({
          error: "Acesso negado: usuário não possui perfil gestão.",
        });
      }

      const detailAnyUserService = new DetailAnyUserService();
      const user = await detailAnyUserService.execute(targetUserId);

      return res.json(user);
    } catch (error) {
      console.error("Erro ao buscar os detalhes do usuário:", error);

      if (error.message === "Usuário não encontrado.") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}

export { DetailAnyUserController };
