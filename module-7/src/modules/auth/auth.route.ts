import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/refresh-token", authController.generateToken);

export default authRouter;
