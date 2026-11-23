import { RequestHandler } from "express";
import { IUser } from "./user.interface";
import { userService } from "./user.service";

const createUser: RequestHandler = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);

    const { password, ...data } = result;

    res.status(201).send({
      success: true,
      message: "User created successful!",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong!",
    });
  }
};

const updateUser: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params?.id);
    if (!id) {
      throw new Error("Invalid User ID");
    }
    const result = await userService.updateUser(id, req.body);

    const { password, ...data } = result;

    res.status(200).send({
      success: true,
      message: "User updated successful!",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong!",
    });
  }
};

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    const data = result
      .filter((user: IUser) => user.is_active)
      .map((user: IUser) => {
        const { password, ...rest } = user;
        return rest;
      });
    res.status(200).send({
      success: true,
      message: "Users data retrieved successful!",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong!",
    });
  }
};

const getSingleUser: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params?.id);
    if (!id) {
      throw new Error("Invalid User ID");
    }
    const result: IUser = await userService.getSingleUser(id);

    if (!result.is_active) {
      throw new Error("User not exist!");
    }

    const { password, ...data } = result;

    res.status(200).send({
      success: true,
      message: "User data retrieved successful!",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong!",
    });
  }
};

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params?.id);
    if (!id) {
      throw new Error("Invalid User ID");
    }
    await userService.deleteUser(id);

    res.status(200).send({
      success: true,
      message: "User deleted successful!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong!",
    });
  }
};

export const userController = {
  createUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
