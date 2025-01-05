import prismaClient from "../../prisma";

class ListAllProductsService {
    async execute() {
        try {
            // Busca todos os produtos sem filtro
            const allProducts = await prismaClient.product.findMany();

            return allProducts;
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Erro ao listar todos os produtos');
            }
        }
    }
}

export { ListAllProductsService };