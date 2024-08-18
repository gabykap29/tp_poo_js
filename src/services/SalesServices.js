import Sales from "../models/Sales.js";

class SalesService {
  constructor() {}

  async createSale(sale) {
    try {
      const newSale = await Sales.create(sale);
      if (!newSale) {
        throw new Error("failed to create sale");
      }
      return newSale;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while creating sale");
    }
  }
  async getSales() {
    try {
      const sales = await Sales.find();
      if (!sales) {
        throw new Error("sales not found");
      }
      return sales;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while getting sales");
    }
  }
  async getSale(id) {
    try {
      const sale = await Sales.findOne({
        _id: id,
      });
      if (!sale) {
        throw new Error("sale not found");
      }
      return sale;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while getting sale");
    }
  }
  async findSalesByUser(userId) {
    try {
      const sales = await Sales.find({
        userId,
      });
      if (!sales) {
        throw new Error("sales not found");
      }
      return sales;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while getting sales");
    }
  }
}

export default SalesService;
