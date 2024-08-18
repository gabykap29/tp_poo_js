import User from "../models/User.js";

class UserService {
  constructor() {}

  async getAll() {
    try {
      const users = await User.find();
      if (!users) {
        throw new Error("users not found");
      }
      return users;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while getting users");
    }
  }

  async create(user) {
    try {
      const newUser = await User.create(user);
      if (!newUser) {
        throw new Error("failed to create user");
      }
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while getting users");
    }
  }

  async getOne(id) {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (!user) {
        throw new Error("user not found");
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while getting user");
    }
  }
  async update(id, user) {
    try {
      const updateUser = await User.findByIdAndUpdate(id, user, {
        new: true,
      });
      if (!updateUser) {
        throw new Error("failed to update user");
      }
      await updateUser.save();
      return updateUser;
    } catch (error) {
      console.log(error);
      throw new Error("server internal error while getting user");
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
      console.log(error);
      throw new Error("server internal error while deleting");
    }
  }
}

export default UserService;
