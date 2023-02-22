import { Request, Response } from 'express';
import productsRepository from '../repositories/productsRepository';

class ProductController {
  async index(req: Request, res: Response) {
    const products = await productsRepository.findAll();

    res.status(200).json(products);
  }

  async store(req: Request, res: Response) {
    try {
      const imagePath = req.file?.filename;
      const { name, description, price, category, ingredients } = req.body;

      const productData = {
        name,
        description,
        price: Number(price),
        category,
        ingredients: ingredients ? JSON.parse(ingredients) : [],
        imagePath
      };

      const productCreated = await productsRepository.create(productData);

      res.status(201).json(productCreated);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  async listProductsByCategory(req: Request, res: Response) {
    const { categoryId } = req.params;

    const productsByCategoryId = await productsRepository.findProductsByCategory(categoryId);

    res.status(200).json(productsByCategoryId);
  }
}

export default new ProductController;
