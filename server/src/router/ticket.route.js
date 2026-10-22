import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTicket, getAllSupportItems } from "../controller/ticket.controller.js";

const ticketRouter = Router();

// Create ticket: employee submits only the issue
ticketRouter.post("/", authMiddleware, createTicket);
ticketRouter.get("/", authMiddleware, getAllSupportItems);

export default ticketRouter;
