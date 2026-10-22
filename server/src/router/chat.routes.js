
import express from "express";
import { getConversation, sendMessage } from "../controller/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const chatRouter = express.Router();

chatRouter.post("/message", authMiddleware, sendMessage);
chatRouter.get(
  "/conversations/:conversationId",
  authMiddleware,
  getConversation
);

export default chatRouter;
