import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import prismaClient from "../../prisma";

class CreateProductController {
  async handle(req: Request, res: Response) {
    try {
      // Extrai os dados do corpo da requisição
      const { name, price, description, category_id } = req.body;

      // Verificação de campos obrigatórios
      if (!name || !price || !description || !category_id) {
        return res.status(400).json({
          error:
            "Campos obrigatórios não preenchidos: nome, preço, descrição e categoria.",
        });
      }

      // Verifica se o produto já existe pelo nome
      const productAlreadyExists = await prismaClient.product.findFirst({
        where: { name },
      });

      if (productAlreadyExists) {
        return res
          .status(409)
          .json({ error: "Produto já cadastrado com este nome!" });
      }

      // Trata o upload da imagem como opcional
      const banner = req.file?.filename || undefined;

      // Conversão do preço para número decimal
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        return res
          .status(400)
          .json({ error: "Preço inválido. Deve ser um número decimal positivo." });
      }

      // Chama o serviço para criar o produto
      const createProductService = new CreateProductService();
      const product = await createProductService.execute({
        name,
        price: numericPrice,
        description,
        banner, // `banner` será undefined se não for enviado
        category_id,
      });

      return res.status(201).json(product);
    } catch (error: any) {
      console.error("Erro ao criar produto:", error);

      if (error.message.includes("Categoria não encontrada")) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}

export { CreateProductController };

