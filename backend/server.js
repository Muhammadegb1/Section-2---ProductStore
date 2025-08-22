import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; 
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to accept JSON data in body

app.use("/api/products",productRoutes); // Use product routes for all product-related requests

app.listen(PORT, () => {
  connectDB();
  console.log('Server Started at http://localhost:' + PORT);
});


// mhmadmig2001
// 5ghl8bK0ayslaMKd