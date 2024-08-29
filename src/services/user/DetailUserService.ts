import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {
        // Busca o usuário no banco de dados usando Prisma
        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
            }
        });

        // Se o usuário não for encontrado, lança um erro
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return user;
    }
}

export { DetailUserService };
