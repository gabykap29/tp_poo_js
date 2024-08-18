import SalesService from "../services/SalesServices.js";

class SalesCtrl {
  constructor() {
    this.salesService = new SalesService();
  }

  async createSale(req, res) {
    try {
      const sale = req.body;
      const newSale = await this.salesService.createSale(sale);
      return res.status(201).json(newSale);
    } catch (error) {
      if (error.message.includes("failed to create sale")) {
        return res.status(400).json({
          status: 400,
          message: "Sale not created",
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
  async getSales(req, res) {
    try {
      const sales = await this.salesService.getSales();
      return res.status(200).json(sales);
    } catch (error) {
      if (error.message.includes("sales not found")) {
        return res.status(404).json({
          status: 404,
          message: "Sales not found",
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
  async getSale(req, res) {
    try {
      const id = req.params.id;
      const sale = await this.salesService.getSale(id);
      return res.status(200).json(sale);
    } catch (error) {
      if (error.message.includes("sale not found")) {
        return res.status(404).json({
          status: 404,
          message: "Sale not found",
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
  async findSalesByUser(req, res) {
    try {
      const userId = req.params.userId;
      const sales = await this.salesService.findSalesByUser(userId);
      return res.status(200).json(sales);
    } catch (error) {
      if (error.message.includes("sales not found")) {
        return res.status(404).json({
          status: 404,
          message: "Sales not found",
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

export default SalesCtrl;
