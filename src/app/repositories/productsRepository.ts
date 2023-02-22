import ProductTypes from '../../Types/ProductTypes';
import { Product } from '../models/Product';

class ProductsRepository {
  async findAll() {
    const products = await Product.find();

    return products;
  }

  async create(productData: ProductTypes){
    const productCreated = await Product.create(productData);

    return productCreated;
  }

  async findProductsByCategory(categoryId: string) {
    const products = await Product.find().where('category').equals(categoryId);

    return products;
  }
}

export default new ProductsRepository;
