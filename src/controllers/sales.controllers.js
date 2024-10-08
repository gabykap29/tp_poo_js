import SalesService from "../services/SalesServices.js";
import { checkRolSeller } from "../middlewares/checkRol.js";
import { checkRolAdmin } from "../middlewares/checkRol.js";
class SalesCtrl {
  constructor() {
    this.salesService = new SalesService();
  }

  async createSale(req, res) {
    try {
      const token = req.headers.authorization;
      const isSeller = checkRolSeller(token);
      if (!isSeller) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const sale = req.body;

      const newSale = await this.salesService.createSale(sale);
      return res.status(201).json(newSale);
    } catch (error) {
      console.error("Error creating sale:", error.message);
      return res.status(500).json({
        status: 500,
        message: "Internal server error while creating sale",
      });
    }
  }

  async getSales(req, res) {
    try {
      const token = req.headers.authorization;
      const isSeller = checkRolSeller(token);
      if (!isSeller) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const sales = await this.salesService.getSales();
      return res.status(200).json(sales);
    } catch (error) {
      console.error("Error fetching sales:", error.message);
      return res.status(500).json({
        status: 500,
        message: "Internal server error while fetching sales",
      });
    }
  }

  async getSale(req, res) {
    try {
      const token = req.headers.authorization;
      const isSeller = checkRolSeller(token);
      if (!isSeller) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const id = req.params.id;
      const sale = await this.salesService.getSale(id);
      return res.status(200).json(sale);
    } catch (error) {
      console.error("Error fetching sale:", error.message);
      return res.status(404).json({
        status: 404,
        message: "Sale not found",
      });
    }
  }

  async findSalesByUser(req, res) {
    try {
      const token = req.headers.authorization;
      const isAdmin = checkRolAdmin(token);
      if (!isAdmin) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }

      const userId = req.params.userId;
      const sales = await this.salesService.findSalesByUser(userId);
      return res.status(200).json(sales);
    } catch (error) {
      console.error("Error fetching sales by user:", error.message);
      return res.status(404).json({
        status: 404,
        message: "Sales not found for user",
      });
    }
  }
}

export default SalesCtrl;
