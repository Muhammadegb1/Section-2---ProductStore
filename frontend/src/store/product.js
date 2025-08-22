import {create} from "zustand";
// Zustand store for managing product state
// This store will hold the products and provide a method to update them
export const useProductStore = create((set) => ({
  products: [], // Initial state for products
  setProducts: (products) => set({ products }), // Method to update the products state
  createProduct: async (newProduct) => {
    // Function to create a new product

    if(!newProduct.name || !newProduct.image || !newProduct.price) {
      return {success:false, message: "Please fill all fields"};
    }
    const res = await fetch("/api/products",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });
    const data = await res.json();
    set((state) => ({
        products: [...state.products, data.data]
  }));
        return {success: true, message: "Product created successfully"};
}
}));
