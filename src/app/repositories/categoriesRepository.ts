import { Category } from '../models/Category';

interface CategoryData {
  icon: string,
  name: string
}

class CategoriesRepository {

  async findAll() {
    const categories = await Category.find();

    return categories;
  }

  async create(categoryData: CategoryData) {
    const newCategory = await Category.create(categoryData);

    return newCategory;
  }
}

export default new CategoriesRepository;
