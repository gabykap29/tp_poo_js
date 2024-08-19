import UserService from "../services/UserService.js";
import { checkRolAdmin } from "../middlewares/checkRol.js";

const messages = {
  internalError: "Error interno del servidor",
  notFound: "Usuario no encontrado!",
  notCreated: "Error al crear el usuario",
  created: "Usuario creado con éxito",
  notUpdated: "Error al intentar actualizar el usuario",
  updated: "Usuario actualizado con éxito!",
  notDeleted: "Error al intentar eliminar el usuario",
  deleted: "Usuario eliminado con éxito!",
};

class UserCtrl {
  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req, res) {
    try {
      const token = req.headers.authorization;
      const isAdmin = checkRolAdmin(token);
      if (!isAdmin) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const users = await this.userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async createUser(req, res) {
    try {
      const token = req.headers.authorization;
      const isAdmin = checkRolAdmin(token);
      if (!isAdmin) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }

      const body = req.body;
      const newUser = await this.userService.create(body);
      return res.status(201).json({
        status: 201,
        message: messages.created,
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async getUser(req, res) {
    try {
      const token = req.headers.authorization;
      const isAdmin = checkRolAdmin(token);
      if (!isAdmin) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const id = req.params.id;
      const user = await this.userService.getOne(id);
      return res.status(200).json(user);
    } catch (error) {
      if (error.message.includes("user not found")) {
        console.log("entró");
        return res.status(404).json({
          status: 404,
          message: messages.notFound,
        });
      }
      console.log("esto es error.message: ", error.message);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const token = req.headers.authorization;
      const isAdmin = checkRolAdmin(token);
      if (!isAdmin) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }

      const id = req.params.id;
      const body = req.body;
      const updatedUser = await this.userService.update(id, body);
      return res.status(200).json({
        status: 200,
        message: messages.updated,
        data: updatedUser,
      });
    } catch (error) {
      if (error.message === "failed to update user") {
        return res.status(400).json({
          status: 400,
          message: messages.notUpdated,
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const token = req.headers.authorization;
      const isAdmin = checkRolAdmin(token);
      if (!isAdmin) {
        return res.status(401).json({
          status: 401,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
      const id = req.params.id;
      const deletedUser = await this.userService.delete(id);
      return res.status(200).json({
        status: 200,
        message: messages.deleted,
        data: deletedUser,
      });
    } catch (error) {
      if (error.message === "failed to delete user") {
        return res.status(400).json({
          status: 400,
          message: messages.notDeleted,
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }
}

export default UserCtrl;
