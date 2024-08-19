import Sales from "../models/Sales.js";

class SalesService {
  constructor() {}

  // Crear una nueva venta
  async createSale(sale) {
    try {
      // Crear la venta en la base de datos
      const newSale = await Sales.create(sale);
      if (!newSale) {
        throw new Error("Failed to create sale");
      }
      return newSale;
    } catch (error) {
      console.error("Error in createSale:", error.message);
      throw new Error("Failed to create sale");
    }
  }

  // Obtener todas las ventas
  async getSales() {
    try {
      // Obtener todas las ventas
      const sales = await Sales.find();
      if (!sales || sales.length === 0) {
        throw new Error("Sales not found");
      }
      return sales;
    } catch (error) {
      console.error("Error in getSales:", error.message);
      throw new Error("Failed to retrieve sales");
    }
  }

  // Obtener una venta por ID
  async getSale(id) {
    try {
      // Buscar una venta por ID
      const sale = await Sales.findById(id);
      if (!sale) {
        throw new Error("Sale not found");
      }
      return sale;
    } catch (error) {
      console.error("Error in getSale:", error.message);
      throw new Error("Failed to retrieve sale");
    }
  }

  // Encontrar ventas por ID de usuario
  async findSalesByUser(userId) {
    try {
      // Buscar ventas por ID de usuario
      const sales = await Sales.find({ userId });
      if (!sales || sales.length === 0) {
        throw new Error("Sales not found");
      }
      return sales;
    } catch (error) {
      console.error("Error in findSalesByUser:", error.message);
      throw new Error("Failed to retrieve sales for user");
    }
  }
}

export default SalesService;
