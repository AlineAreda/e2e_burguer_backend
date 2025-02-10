import prismaClient from "../../prisma";

class DetailAnyUserService {
  async execute(targetUserId: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: targetUserId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isGestao: true, 
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }
}

export { DetailAnyUserService };
