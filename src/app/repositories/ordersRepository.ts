import { Order } from '../models/Order';

interface OrderData {
  table: string,
  products: Array<object>
}

class OrdersRepository {

  async findAll() {
    const orders = await Order.find()
      .sort({ createdAt: 1 })
      .populate('products.product');

    return orders;
  }

  async create(orderData: OrderData) {
    const orderCreated = await Order.create(orderData);

    return orderCreated;
  }

  async update(orderId: string, status: string) {
    await Order.findByIdAndUpdate(orderId, { status });
  }

  async delete(orderId: string) {
    await Order.findByIdAndDelete(orderId);
  }
}

export default new OrdersRepository;
