import { Router } from 'express';
import path from 'node:path';
import multer from 'multer';

import categoryController from './app/controllers/categoryController';
import orderController from './app/controllers/orderController';
import productController from './app/controllers/productController';


export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// List categories
router.get('/categories', categoryController.index);

// Create Category
router.post('/categories', categoryController.store);

// List Products
router.get('/products', productController.index);

// Create Product
router.post('/products', upload.single('image'), productController.store);

// Get Products By Category
router.get('/categories/:categoryId/products', productController.listProductsByCategory);

// List orders
router.get('/orders', orderController.index);

// Create order
router.post('/orders', orderController.store);

// Change order status
router.patch('/orders/:orderId', orderController.update);

// Delete/Cancel order
router.delete('/orders/:orderId', orderController.delete);
