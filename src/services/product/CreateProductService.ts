import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: number;
  description: string;
  banner?: string; // Torna o campo opcional
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
      throw new Error(
        "Categoria não encontrada. Informe um ID de categoria válido."
      );
    }

    try {
      // Criação do produto
      const data: any = {
        name,
        price: price.toString(), // Salva o preço como string, conforme modelo do banco
        description,
        category_id,
      };

      // Inclui o campo banner apenas se ele for fornecido
      if (banner) {
        data.banner = banner;
      }

      const product = await prismaClient.product.create({ data });

      return product;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw new Error("Erro ao criar produto.");
    }
  }
}

export { CreateProductService };
