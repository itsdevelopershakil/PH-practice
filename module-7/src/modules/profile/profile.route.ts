import { Router } from "express";
import { profileController } from "./profile.controller";

const profileRouter = Router();

profileRouter.post("/", profileController.createProfile);
// userRouter.put("/:id", userController.updateUser);
// userRouter.get("/", userController.getAllUsers);
// userRouter.get("/:id", userController.getSingleUser);
// userRouter.delete("/:id", userController.deleteUser);

export default profileRouter;
