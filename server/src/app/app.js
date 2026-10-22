import express from "express";
import authRouter from "../router/auth.routes.js";
import cookieParser from "cookie-parser";
import ticketRouter from "../router/ticket.route.js";
import chatRoutes from "../router/chat.routes.js";




const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "API is running 🚀",
  });
});


app.use("/api/auth", authRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/chat", chatRoutes);



export default app;
