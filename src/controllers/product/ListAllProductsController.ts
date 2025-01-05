import { Request, Response } from "express";
import { ListAllProductsService } from "../../services/product/ListAllProductsService";

class ListAllProductsController {
    async handle(req: Request, res: Response) {
        const service = new ListAllProductsService();

        try {
            const products = await service.execute();
            return res.json(products);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export { ListAllProductsController };