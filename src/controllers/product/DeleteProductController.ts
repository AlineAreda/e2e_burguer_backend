import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    
    const deleteProductService = new DeleteProductService();
    
    try {
      await deleteProductService.execute({ id });
      return res.status(204).send(); // Sem corpo de resposta, pois 204 indica "No Content"
    } catch (error) { 
      return res.status(400).json({ message: error.message });
    }
  }
}

export { DeleteProductController };
