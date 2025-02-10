import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: number;
  description: string;
  banner?: string; // torna o banner opcional
  category_id: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: ProductRequest) {
    // Validação de campos obrigatórios
    if (!name || price == null || !description || !category_id) {
      throw new Error("Campos obrigatórios não preenchidos.");
    }

    // Validação do valor numérico do preço
    if (isNaN(price) || price <= 0) {
      throw new Error("Preço inválido. Deve ser um número decimal positivo.");
    }

    // Verifica se a categoria existe
    const category = await prismaClient.category.findUnique({
      where: {
        id: category_id,
      },
    });

    if (!category) {
      throw new Error("Categoria não encontrada. Informe um ID de categoria válido.");
    }

    try {
      // Criação do produto
      const product = await prismaClient.product.create({
        data: {
          name,
          price: price.toString(),
          description,
          banner: banner || "https://via.placeholder.com/150", // banner padrão se o campo não for enviado
          category_id,
        },
      });

      return product;
    } catch (error: any) {
      console.error("Erro ao criar produto:", error.message);
      throw new Error("Erro ao criar produto. Por favor, tente novamente.");
    }
  }
}

export { CreateProductService };
