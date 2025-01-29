import User from "../models/user.schema.js";
import { verifyToken } from "../utils/token.utils.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = verifyToken(token);

    if (!decoded.id) {
      return res.status(401).json({ message: "Id not found" });
    }
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    console.log("authMiddleware error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
