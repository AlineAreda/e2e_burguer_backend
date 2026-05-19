import prismaClient from "../../prisma";

class DetailUserByEmailService {
  async execute(email: string) {
    if (!email) {
      throw new Error("Email do usuário é necessário.");
    }

    const normalizedEmail = email.toLowerCase();

    const user = await prismaClient.user.findUnique({
      where: {
        email: normalizedEmail,
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

export { DetailUserByEmailService };