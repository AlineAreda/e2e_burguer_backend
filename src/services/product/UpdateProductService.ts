import prismaClient from "../../prisma";

interface UpdateProductRequest {
  productId: string;
  name?: string;
  price?: string; // Mantido como string para compatibilidade com o banco de dados
  description?: string;
  banner?: string; // Opcional
}

class UpdateProductService {
  async execute({ productId, name, price, description, banner }: UpdateProductRequest) {
    // Verifica se o produto existe
    const existingProduct = await prismaClient.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error("Produto não encontrado.");
    }

    // Prepara os dados para atualização apenas com os campos fornecidos
    const updateData: any = {};
    if (name) updateData.name = name;
    if (price) {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice)) {
        throw new Error("Preço inválido.");
      }
      updateData.price = numericPrice.toString();
    }
    if (description) updateData.description = description;
    if (banner) updateData.banner = banner;

    // Atualiza o produto sem alterar o category_id
    const updatedProduct = await prismaClient.product.update({
      where: { id: productId },
      data: updateData,
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        category_id: true,
        updated_at: true,
      },
    });

    return updatedProduct;
  }
}

export { UpdateProductService };

