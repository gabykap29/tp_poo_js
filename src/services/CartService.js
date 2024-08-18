import Cart from "../models/Cart.js";

class CartService {
  constructor() {}

  async createCart(userId) {
    try {
      const cart = await Cart.create({ userId });
      if (!cart) {
        throw new Error("failed to create cart");
      }
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while creating cart");
    }
  }
  async getCart(userId) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error("cart not found");
      }
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while getting cart");
    }
  }
  async addItemToCart(userId, item) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error("cart not found");
      }
      cart.items.push(item);
      cart.totalPrice += item.price;
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while adding item to cart");
    }
  }
  async removeItemFromCart(userId, productId) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error("cart not found");
      }
      const item = cart.items.find((item) => item.productId === productId);
      if (!item) {
        throw new Error("item not found");
      }
      cart.totalPrice -= item.price;
      cart.items = cart.items.filter((item) => item.productId !== productId);
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while removing item from cart");
    }
  }
  async clearCart(userId) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error("cart not found");
      }
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while clearing cart");
    }
  }
  async deleteCart(userId) {
    try {
      const cart = await Cart.findOneAndDelete({ userId });
      if (!cart) {
        throw new Error("cart not found");
      }
      return cart;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while deleting");
    }
  }
}

export default CartService;
