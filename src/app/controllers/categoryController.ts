import { Request, Response } from 'express';
import categoriesRepository from '../repositories/categoriesRepository';

class CategoryController {

  async index(req: Request, res: Response) {
    const categories = await categoriesRepository.findAll();

    res.status(200).json(categories);
  }

  async store(req: Request, res: Response) {
    try {
      const { icon, name } = req.body;

      const categoryData = {
        icon,
        name
      };

      const newCategory = await categoriesRepository.create(categoryData);

      res.status(201).json(newCategory);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }


}

export default new CategoryController;
