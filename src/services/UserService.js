import User from "../models/User.js";

class UserService {
  constructor() {}

  async getAll() {
    try {
      const users = await User.find().select("-pass");
      if (!users.length) {
        throw new Error("users not found");
      }
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(user) {
    try {
      const body = user;
      const newUser = await User.create({
        name: body.name,
        lastname: body.lastname,
        username: body.username,
        pass: bcrypt.hashSync(body.pass, 10),
        role: body.role,
      });

      if (!newUser) {
        throw new Error("failed to create user");
      }
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      const user = await User.findOne({ _id: id }).select("-pass");
      if (!user) {
        throw new Error("user not found");
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id, user) {
    try {
      const updateUser = await User.findByIdAndUpdate(id, user, { new: true });
      if (!updateUser) {
        throw new Error("failed to update user");
      }
      return updateUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error("failed to delete user");
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserService;
