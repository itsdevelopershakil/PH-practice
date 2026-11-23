import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import appConfig from "./config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import authRouter from "./modules/auth/auth.route";
import profileRouter from "./modules/profile/profile.route";
import userRouter from "./modules/user/user.route";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:5000"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Backend!");
});

app.use(`${appConfig.baseEndPoint}/users`, userRouter);
app.use(`${appConfig.baseEndPoint}/profile`, profileRouter);
app.use(`${appConfig.baseEndPoint}/auth`, authRouter);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
