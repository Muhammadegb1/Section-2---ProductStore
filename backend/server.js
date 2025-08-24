import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from './config/db.js'; 
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // Get the current directory name

app.use(express.json()); // allows us to accept JSON data in body

app.use("/api/products",productRoutes); // Use product routes for all product-related requests

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
  
}
app.listen(PORT, () => {
  connectDB();
  console.log('Server Started at http://localhost:' + PORT);
});


// mhmadmig2001
// 5ghl8bK0ayslaMKd