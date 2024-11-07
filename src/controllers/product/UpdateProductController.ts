import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const { name, price, description } = req.body;
    const banner = req.file ? req.file.filename : undefined;

    const updateProductService = new UpdateProductService();

    try {
      const updatedProduct = await updateProductService.execute({
        productId: id,
        name,
        price,
        description,
        banner,
      });

      return res.status(200).json({
        message: "Produto atualizado com sucesso!",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);

      if (error.message.includes("Produto não encontrado")) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}

export { UpdateProductController };

