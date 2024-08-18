import CartService from "../services/CartService.js";

class CartCrtl {
  constructor() {
    this.cartService = new CartService();
  }

  async createCart(req, res) {
    try {
      const userId = req.params.userId;
      const cart = await this.cartService.createCart(userId);
      return res.status(201).json(cart);
    } catch (error) {
      if (error.message.includes("failed to create cart")) {
        return res.status(400).json({
          status: 400,
          message: "Cart not created",
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
  async getCart(req, res) {
    try {
      const userId = req.params.userId;
      const cart = await this.cartService.getCart(userId);
      return res.status(200).json(cart);
    } catch (error) {
      if (error.message.includes("cart not found")) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found",
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }

  async addItemToCart(req, res) {
    try {
      const userId = req.params.userId;
      const item = req.body;
      const cart = await this.cartService.addItemToCart(userId, item);
      return res.status(200).json(cart);
    } catch (error) {
      if (error.message.includes("cart not found")) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found",
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }

  async removeItemFromCart(req, res) {
    try {
      const userId = req.params.userId;
      const itemId = req.params.itemId;
      const cart = await this.cartService.removeItemFromCart(userId, itemId);
      return res.status(200).json(cart);
    } catch (error) {
      if (error.message.includes("cart not found")) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found",
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
  async clearCart(req, res) {
    try {
      const userId = req.params.userId;
      const cart = await this.cartService.clearCart(userId);
      return res.status(200).json(cart);
    } catch (error) {
      if (error.message.includes("cart not found")) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found",
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
}

export default CartCrtl;
