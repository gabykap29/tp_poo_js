import Cart from "../models/Cart.js";

class CartService {
  constructor() {}

  async getCart(userId) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      console.error("Error in getCart:", error.message);
      throw error;
    }
  }

  async addItemToCart(userId, items) {
    try {
      // Verificar que items es un array
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Items must be a non-empty array");
      }

      // Buscar el carrito del usuario
      let cart = await Cart.findOne({ userId });

      // Si no existe, crear uno nuevo
      if (!cart) {
        const totalPrice = items.reduce(
          (total, item) => total + (item.price || 0) * (item.quantity || 1),
          0,
        );

        cart = await Cart.create({
          userId,
          items,
          totalPrice,
        });
      } else {
        // Actualizar los ítems en el carrito existente
        items.forEach((item) => {
          const existingItem = cart.items.find(
            (i) => i.productId.toString() === item.productId.toString(),
          );

          if (existingItem) {
            existingItem.quantity += item.quantity || 1;
            existingItem.price = item.price;
          } else {
            cart.items.push(item);
          }
        });

        // Recalcular el precio total
        cart.totalPrice = cart.items.reduce(
          (total, item) => total + (item.price || 0) * (item.quantity || 1),
          0,
        );

        await cart.save();
      }

      return cart;
    } catch (error) {
      console.error("Error in addItemToCart:", error.message);
      throw new Error("Internal server error while adding item to cart");
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await Cart.findOne({ _id: cartId });
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error in clearCart:", error.message);
      throw error;
    }
  }

  async deleteCart(userId) {
    try {
      const cart = await Cart.findOneAndDelete({ userId });
      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      console.error("Error in deleteCart:", error.message);
      throw error;
    }
  }
}

export default CartService;
