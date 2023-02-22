import { Request, Response } from 'express';
import ordersRepository from '../repositories/ordersRepository';

class OrderController {
  async index(req: Request, res: Response) {
    try {
      const orders = await ordersRepository.findAll();

      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { table, products } = req.body;
      const orderCreated = await ordersRepository.create({ table, products });

      res.status(201).json(orderCreated);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
        res.status(400).json({
          error: `Status should be one of these: WAITING,
          IN_PRODUCTION or DONE
          `
        });
      }

      await ordersRepository.update(orderId, status);

      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { orderId } = req.params;

      await ordersRepository.delete(orderId);

      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

export default new OrderController;
