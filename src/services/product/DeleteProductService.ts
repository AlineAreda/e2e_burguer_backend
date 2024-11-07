import prismaClient from "../../prisma";

interface DeleteProductRequest {
  id: string;
}

class DeleteProductService {
  async execute({ id }: DeleteProductRequest) {
    try {
      const deleteProduct = await prismaClient.product.delete({
        where: {
          id: id,
        },
      });

      return deleteProduct;
    } catch (error) {
      if (error.code === 'P2025') { // Código de erro específico do Prisma para "registro não encontrado"
        throw new Error(`Produto com o ID ${id} não encontrado.`);
      } else {
        throw new Error(`Erro ao deletar produto: ${error.message}`);
      }
    }
  }
}

export { DeleteProductService };

