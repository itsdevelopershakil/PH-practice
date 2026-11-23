import { Router } from "express";
import auth from "../../middlewares/auth";
import { userController } from "./user.controller";

const userRouter = Router();

const USER_ROLE = {
  admin: "admin",
  user: "user",
} as const;

userRouter.post("/", userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getAllUsers,
);
userRouter.get("/:id", userController.getSingleUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
