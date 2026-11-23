import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import appConfig from "../config";
import { pool } from "../database/db";
import { Role } from "../types";

const auth = (...roles: Role[]): RequestHandler => {
  return async (req, res, next) => {
    try {
      console.log(roles);
      // Check if token exist
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized access!!!",
        });
      }

      const data = jwt.verify(
        token as string,
        appConfig.access_token_secret,
      ) as JwtPayload;

      // Find user and validate
      const user = await pool.query(
        /*sql*/ `
            SELECT * FROM users WHERE id=$1
        `,
        [data.id],
      );

      if (user.rowCount === 0 || !user.rows[0].is_active) {
        return res.status(404).send({
          success: false,
          message: "User not found!!!",
        });
      }

      //   Check access from roles
      if (roles.length && !roles.includes(user.rows[0].role)) {
        return res.status(401).send({
          success: false,
          message: "Access denied!!",
        });
      }

      req.user = data;

      next();
    } catch (error) {
      return res.status(401).send({
        success: false,
        message: "Invalid or expired token!",
      });
    }
  };
};

export default auth;
