import AuthService from "../services/AuhService.js";
import { createToken } from "../utils/jwt.js";
class AuthCtrl {
  constructor() {
    this.authService = new AuthService();
  }

  async login(req, res) {
    try {
      const body = req.body;

      const user = await this.authService.login(body);
      const token = await createToken(user);
      return res.status(200).json({ message: "sesion iniciada!", token });
    } catch (error) {
      if (error.message.includes("Invalid credentials")) {
        return res.status(401).json({
          status: 401,
          message: "Invalid credentials",
        });
      }
      console.error("Error logging in:", error.message);
      return res.status(500).json({
        status: 500,
        message: "Internal server error while logging in",
      });
    }
  }

  async register(req, res) {
    try {
      const user = req.body;

      const newUser = await this.authService.register(user);

      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error registering:", error.message);
      return res.status(500).json({
        status: 500,
        message: "Internal server error while registering",
      });
    }
  }
}

export default AuthCtrl;
