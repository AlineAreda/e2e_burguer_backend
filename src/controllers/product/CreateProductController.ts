import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import prismaClient from "../../prisma";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;
    const createProductService = new CreateProductService();

    // Verificação dos campos obrigatórios
    if (!name || !price || !description || !category_id) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });
    }

    // Verifica se o produto já existe pelo nome
    const productAlreadyExists = await prismaClient.product.findFirst({
      where: {
        name: name,
      },
    });

    if (productAlreadyExists) {
      return res.status(400).json({ error: "Produto já cadastrado!" });
    }

    // Verifica se há um arquivo enviado e usa o nome do arquivo se presente
    const banner = req.file ? req.file.filename : "";

    try {
      // Chama o serviço para criar o produto
      const product = await createProductService.execute({
        name,
        price,
        description,
        banner,
        category_id,
      });
      return res.status(201).json(product);
    } catch (error) {
      console.error("Erro ao criar produto:", error);

      if (error.message.includes("Categoria não encontrada")) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}

export { CreateProductController };
