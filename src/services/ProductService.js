import Product from "../models/Product.js";

class ProductService {
  constructor() {}

  async getAll() {
    try {
      const products = await Product.find();
      if (!products || !products.length) {
        throw new Error("Products not found");
      }
      return products;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      const product = await Product.findOne({ _id: id });
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(product) {
    try {
      const newProduct = await Product.create(product);
      if (!newProduct) {
        throw new Error("Failed to create product");
      }
      return newProduct;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id, product) {
    try {
      const updateProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      if (!updateProduct) {
        throw new Error("Failed to update product");
      }
      return updateProduct;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw new Error("Failed to delete product");
      }
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ProductService;
