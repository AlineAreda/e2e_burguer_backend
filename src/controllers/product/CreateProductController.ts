import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

class CreateProductController {
  async handle(req: Request, res: Response) {
    try {
      const { name, price, description, category_id } = req.body;

      // Validação de campos obrigatórios
      if (!name || !price || !description || !category_id) {
        return res.status(400).json({
          error: 'Campos obrigatórios não preenchidos: nome, preço, descrição e categoria.',
        });
      }

      // O campo `banner` será undefined caso nenhum arquivo seja enviado
      const banner = req.file?.filename || null;

      const createProductService = new CreateProductService();
      const product = await createProductService.execute({
        name,
        price: parseFloat(price),
        description,
        banner, // Passa `null` se o banner não for enviado
        category_id,
      });

      return res.status(201).json(product);
    } catch (error: any) {
      console.error('Erro ao criar produto:', error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

export { CreateProductController };
