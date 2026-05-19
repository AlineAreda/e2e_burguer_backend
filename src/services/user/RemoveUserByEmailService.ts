import prismaClient from "../../prisma";

interface RemoveUserByEmailRequest {
  email: string;
}

class RemoveUserByEmailService {
  async execute({ email }: RemoveUserByEmailRequest) {
    if (!email) {
      throw new Error("Email do usuário é necessário.");
    }

    const normalizedEmail = email.toLowerCase();

    try {
      await prismaClient.user.delete({
        where: {
          email: normalizedEmail,
        },
      });

      return { message: "Usuário excluído com sucesso." };
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new Error("Usuário não encontrado.");
      }

      console.error("Erro ao excluir o usuário por email:", error);
      throw new Error("Erro ao excluir o usuário.");
    }
  }
}

export { RemoveUserByEmailService };