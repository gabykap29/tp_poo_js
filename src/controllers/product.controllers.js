import ProductService from "../services/ProductService.js";

const messages = {
  internalError: "Error interno del servidor",
  notFound: "Aun no hay productos cargados!",
  notCreated: "Error al crear el producto",
  created: "Producto creado con éxito",
  notUpdated: "Error al intentar actualizar el producto",
  updated: "Producto actualizado con éxito!",
  notDeleted: "Error al intentar eliminar el producto",
  deleted: "Producto eliminado con éxito!",
};

class ProductCtrl {
  constructor() {
    this.productService = new ProductService();
  }

  async getProducts(req, res) {
    try {
      const products = await this.productService.getAll();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      if (error.message === "Products not found") {
        return res.status(404).json({
          status: 404,
          message: messages.notFound,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async createProduct(req, res) {
    try {
      const body = req.body;
      const newProduct = await this.productService.create(body);
      return res.status(201).json({
        status: 201,
        message: messages.created,
        data: newProduct,
      });
    } catch (error) {
      console.error(error);
      if (error.message === "Failed to create product") {
        return res.status(400).json({
          status: 400,
          message: messages.notCreated,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await this.productService.getOne(req.params.id);
      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      if (error.message === "Product not found") {
        return res.status(404).json({
          status: 404,
          message: messages.notFound,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await this.productService.getOne(id);
      const updateProduct = await this.productService.update(id, body);
      return res.status(200).json({
        status: 200,
        message: messages.updated,
        data: updateProduct,
      });
    } catch (error) {
      console.error(error);
      if (error.message === "Failed to update product") {
        return res.status(400).json({
          status: 400,
          message: messages.notUpdated,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await this.productService.delete(id);
      return res.status(200).json({
        status: 200,
        message: messages.deleted,
      });
    } catch (error) {
      console.error(error);
      if (error.message === "Failed to delete product") {
        return res.status(400).json({
          status: 400,
          message: messages.notDeleted,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }
}

export default ProductCtrl;
