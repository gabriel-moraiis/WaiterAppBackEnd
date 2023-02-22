import { Schema } from 'mongoose';

interface Ingredients {
  icon: string,
  name: string,
}

export default interface ProductTypes {
  name: string,
  description: string,
  imagePath: string | undefined,
  price: number,
  ingredients: Array<Ingredients> | null,
  category: Schema.Types.ObjectId
};
