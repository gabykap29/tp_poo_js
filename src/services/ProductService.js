import Product from "../models/Product.js";

class ProductService {
  constructor() {}

  async getAll() {
    try {
      const products = await Product.find();
      if (!products) {
        return false;
      }
      return products;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getOne(id) {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (!product) {
        return false;
      }
      return product;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async create(product) {
    try {
      const newProduct = await Product.create(product);
      if (!newProduct) {
        return false;
      }
      return newProduct;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async update(id, product) {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!updateProduct) {
      throw {
        statusCode: 400,
        status: "Required fields missing",
        message: "Campos requeridos faltantes",
      };
    }
    await updateProduct.save();
    return updateProduct;
  }
  async delete(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return false;
    }

    return product;
  }
}

export default ProductService;
