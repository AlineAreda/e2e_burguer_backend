import prismaClient from "../../prisma";

class ListAllUsersService {
  async execute() {
    try {
      const users = await prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          cpf: true,
          student_e2e: true,
          created_at: true,
          updated_at: true,
        },
      }); // Busca todos os usuários com os campos específicos
      return users;
    } catch (error) {
      console.error("Erro ao listar todos os usuários:", error);
      throw new Error("Erro ao listar todos os usuários");
    }
  }
}

export { ListAllUsersService };
