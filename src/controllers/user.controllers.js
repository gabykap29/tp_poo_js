import UserService from "../services/UserService.js";

const messages = {
  internalError: "Error interno del servidor",
  notFound: "Aun no hay usuarios cargados!",
  notCreated: "Error al crear el usuario",
  created: "Usuario creado con exito",
  notUpdated: "Error al intentar actualizar el usuario",
  updated: "Usuario actualizado con exito!",
  notDeleted: "Error al intentar eliminar el Usuario",
  deleted: "Usuario eliminado con exito!",
};

class UserCtrl {
  constructor() {
    this.userService = new UserService();
  }
  async getUsers(req, res) {
    try {
      const users = await userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      if (error.message.includes("users not found")) {
        return res.status(404).json({
          status: 404,
          message: messages.notFound,
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }
  async createUSer(req, res) {
    try {
      const body = req.body;
      const newUser = await userService.create(body);
      return res.status(201).json({
        status: 201,
        message: messages.created,
      });
    } catch (error) {
      if (error.message.includes("failed to create user")) {
        return res.status(400).json({
          status: 400,
          message: messages.notCreated,
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }
  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.getOne(id);
      return res.status(200).json(user);
    } catch (error) {
      if (error.message.includes("user not found")) {
        return res.status(404).json({
          status: 404,
          message: messages.notFound,
        });
      }
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }
  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      await userService.update(id, body);
      return res.status(200).json({
        status: 200,
        message: messages.updated,
      });
    } catch (error) {
      if (error.message.includes("failed to update user")) {
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
      const id = req.params.id;
      await userService.delete(id);
      return res.status(200).json({
        status: 200,
        message: messages.deleted,
      });
    } catch (error) {
      if (error.message.includes("failed to delete user")) {
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
