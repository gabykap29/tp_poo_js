import ProductService from "../services/ProductService.js";

const messages = {
  internalError: "Error interno del servidor",
  notFound: "Aun no hay productos cargados!",
  notCreated: "Error al crear el producto",
  created: "Producto creado con exito",
  notUpdated: "Error al intentar actualizar el producto",
  updated: "Producto actualizado con exito!",
  notDeleted: "Error al intentar eliminar el producto",
  deleted: "Producto eliminado con exito!",
};

class ProductCtrl {
  constructor() {
    this.productService = new ProductService();
  }
  async getProducts(req, res) {
    try {
      const products = await productService.getAll();
      if (products.length === 0 || !products) {
        return res.status(404).json({
          status: 404,
          message: messages.notFound,
        });
      }
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async createProduct(req, res) {
    try {
      const body = req.body;
      const newProduct = await productService.create(body);
      if (!newProduct) {
        return res.status(400).json({
          status: 400,
          message: messages.notCreated,
        });
      }
      return res.status(201).json({
        status: 201,
        message: messages.created,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }
  async getProduct(req, res) {
    try {
      const product = await productService.getOne(req.params.id);
      if (!product) {
        return res.status(404).json({
          status: 404,
          message: messages.notFound,
        });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
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
      const updateProduct = await productService.update(id, body);
      if (!updateProduct) {
        return res.status({
          status: 400,
          message: messages.notUpdated,
        });
      }
      return res.status(201).json({
        status: 201,
        message: messages.updated,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.delete(id);
      if (!product) {
        return res.status(400).json({
          status: 400,
          message: messages.notDeleted,
        });
      }
      return res.status(200).json({
        status: 200,
        message: messages.deleted,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }
}
export default ProductCtrl;
