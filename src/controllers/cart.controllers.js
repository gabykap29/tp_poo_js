import CartService from "../services/CartService.js";
import { checkRolClient } from "../middlewares/checkRol.js";}
class CartCrtl {
  constructor() {
    this.cartService = new CartService();
  }

  async getCart(req, res) {
    try {
      const token = req.headers.authorization;
      const isClient = checkRolClient(token);
      if(!isClient){
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const userId = req.params.userId;
      const cart = await this.cartService.getCart(userId);
      return res.status(200).json(cart);
    } catch (error) {
      console.error("Error retrieving cart:", error.message);
      return res.status(500).json({
        status: 500,
        message: "Internal server error while retrieving cart",
      });
    }
  }

  async addItemToCart(req, res) {
    try {
      const token = req.headers.authorization;
      const isClient = checkRolClient(token);
      if(!isClient){
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const userId = req.params.userId;
      const items = req.body.items;

      const cart = await this.cartService.addItemToCart(userId, items);

      return res.status(200).json(cart);
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
      if (error.message.includes("Items must be a non-empty array")) {
        return res.status(400).json({
          status: 400,
          message: "Invalid items format",
        });
      }
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }

  async clearCart(req, res) {
    try {
      const token = req.headers.authorization;
      const isClient = checkRolClient(token);
      if(!isClient){
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const cardId = req.params.cartId;
      console.log(cardId);
      const cart = await this.cartService.clearCart(cardId);
      return res.status(200).json(cart);
    } catch (error) {
      console.error("Error clearing cart:", error.message);
      if (error.message.includes("cart not found")) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found",
        });
      }
      return res.status(500).json({
        status: 500,
        message: "Internal server error while clearing cart",
      });
    }
  }
}

export default CartCrtl;
