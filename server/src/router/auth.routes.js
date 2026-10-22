import express from "express";

import {
  registerUser,
  login,
  refreshToken,
  profile,
  logout,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";



const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", login);

authRouter.post("/refresh-token", refreshToken);

authRouter.get("/me", authMiddleware, profile);

authRouter.post("/logout", authMiddleware, logout);

export default authRouter;