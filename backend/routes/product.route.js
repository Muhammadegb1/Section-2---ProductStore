import express from 'express';
import { createProduct, deleteProduct, getProducts , updateProduct} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts); // Route to get all products
router.post('/', createProduct); // Route to create a new product
router.put('/:id', updateProduct); // Route to update a product by ID
router.delete('/:id', deleteProduct); // Route to delete a product by ID

export default router;