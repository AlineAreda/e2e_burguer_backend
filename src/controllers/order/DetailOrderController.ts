import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.query;

    // Validação de entrada
    if (!order_id || typeof order_id !== 'string') {
      return res.status(400).json({ error: "ID do pedido é necessário e deve ser uma string." });
    }

    const detailOrderService = new DetailOrderService();

    try {
      const orderDetails = await detailOrderService.execute({ order_id });

      // Verificação se o pedido existe e possui itens
      if (!orderDetails || orderDetails.length === 0) {
        return res.status(404).json({ error: "Pedido não encontrado ou sem itens." });
      }

      return res.json(orderDetails);
    } catch (error: any) {
      console.error("Erro ao obter detalhes do pedido:", error);

      // Personalização do código de status baseado no tipo de erro
      if (error.message.includes("Pedido não encontrado")) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export { DetailOrderController };



