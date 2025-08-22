import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products from the database
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching Products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async(req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save(); // Save the product to the database
    res.status(201).json({ success: true, data: newProduct }); //
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({ success: false, message: error.message });//
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters  
  const product = req.body; // Get the updated product data from the request body

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Product ID' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product,{new:true}); // Find the product by ID and update it and return the updated document
    res.status(200).json({ success: true, data: updatedProduct }); // Return the updated product

  } catch (error) {
    console.error("Error in Update Product:", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteProduct = async (req, res) => { 
    const { id } = req.params; // Get the product ID from the request parameters

    if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Product ID' });
  }
  try {
    await Product.findByIdAndDelete(id); // Find and delete the product by ID
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error in Delete Product:", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
