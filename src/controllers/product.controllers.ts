import ProductService from "../services/ProductService";
import { Request, Response } from "express";
import { checkRolSeller } from "../middlewares/checkRol";

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
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  async getProducts(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      // verificar si el token existe y si es válido
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const token = authHeader.split(" ")[1]; // se extrae el token

      // verifica que el token no sea undefined
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const isSeller = checkRolSeller({ token });
      if (!isSeller) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const products = await this.productService.getAll();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      error instanceof Error
        ? res.status(404).json({ message: error.message })
        : res.status(500).json({ message: messages.internalError });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      // verificar si el token existe y si es válido
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const token = authHeader.split(" ")[1]; // se extrae el token

      // verifica que el token no sea undefined
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const isSeller = checkRolSeller({ token });
      if (!isSeller) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const body = req.body;
      const newProduct = await this.productService.create(body);
      return res.status(201).json({
        status: 201,
        message: messages.created,
        data: newProduct,
      });
    } catch (error) {
      console.error(error);
      error instanceof Error
        ? res.status(404).json({ message: error.message })
        : res.status(500).json({ message: messages.internalError });
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      // verificar si el token existe y si es válido
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const token = authHeader.split(" ")[1]; // se extrae el token

      // verifica que el token no sea undefined
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const isSeller = checkRolSeller({ token });
      if (!isSeller) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const product = await this.productService.getOne(req.params.id);
      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      error instanceof Error
        ? res.status(404).json({ message: error.message })
        : res.status(500).json({ message: messages.internalError });
    }
    return res.status(500).json({
      status: 500,
      message: messages.internalError,
    });
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      // verificar si el token existe y si es válido
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const token = authHeader.split(" ")[1]; // se extrae el token

      // verifica que el token no sea undefined
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const isSeller = checkRolSeller({ token });
      if (!isSeller) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
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
      error instanceof Error
        ? res.status(404).json({ message: error.message })
        : res.status(500).json({ message: messages.internalError });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      // verificar si el token existe y si es válido
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const token = authHeader.split(" ")[1]; // se extrae el token

      // verifica que el token no sea undefined
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "Token no proporcionado o formato incorrecto",
        });
      }

      const isSeller = checkRolSeller({ token });
      if (!isSeller) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const { id } = req.params;
      const product = await this.productService.delete(id);
      return res.status(200).json({
        status: 200,
        message: messages.deleted,
      });
    } catch (error) {
      console.error(error);
      error instanceof Error
        ? res.status(404).json({ message: error.message })
        : res.status(500).json({ message: messages.internalError });
    }
    return res.status(500).json({
      status: 500,
      message: messages.internalError,
    });
  }
}

export default ProductCtrl;
