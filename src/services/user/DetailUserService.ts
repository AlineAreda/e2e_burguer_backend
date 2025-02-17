import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                isGestao: true, // Inclui o campo isGestao
                created_at: true,
                updated_at: true,
            },
        });

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return user;
    }
}

export { DetailUserService };
