import User from "../models/user.model.js";
import { verifyAccessToken } from "../utils/createToken.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Get access token from HttpOnly cookie
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Verify token
    const decoded = verifyAccessToken(accessToken);

    // Get user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};