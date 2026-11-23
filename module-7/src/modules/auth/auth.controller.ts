import { RequestHandler } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import appConfig from "../../config";
import { IUser } from "../user/user.interface";
import { authService } from "./auth.service";

const login: RequestHandler = async (req, res) => {
  try {
    const user: Partial<IUser> = await authService.login(req.body);

    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(jwtPayload, appConfig.access_token_secret, {
      expiresIn: (appConfig.access_token_expire ||
        "1h") as SignOptions["expiresIn"],
    });

    const refreshToken = jwt.sign(jwtPayload, appConfig.refresh_token_secret, {
      expiresIn: (appConfig.refresh_token_expire ||
        "10d") as SignOptions["expiresIn"],
    });

    res.cookie("refreshToken", refreshToken, {
      domain: "localhost",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    res.status(200).send({
      success: true,
      message: "Login successful!",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong!",
    });
  }
};

const generateToken: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access!!",
      });
    }
    const user: Partial<IUser> = await authService.generateToken(refreshToken);

    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(jwtPayload, appConfig.access_token_secret, {
      expiresIn: (appConfig.access_token_expire ||
        "1h") as SignOptions["expiresIn"],
    });

    res.status(201).send({
      success: true,
      message: "Token generate successful!",
      data: { accessToken },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong!",
    });
  }
};

export const authController = {
  login,
  generateToken,
};
