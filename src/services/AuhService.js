import User from "../models/User.js";
import bcrypt from "bcryptjs";

class AuthService {
  constructor() {}

  async login(credentials) {
    try {
      const { username, pass } = credentials;

      const user = await User.findOne({ username: username });
      const passDecoded = bcrypt.compareSync(pass, user.pass);
      if (!passDecoded) {
        throw new Error("Invalid credentials");
      }
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async register(user) {
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
}

export default AuthService;
