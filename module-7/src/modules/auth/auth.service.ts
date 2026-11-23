import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import appConfig from "../../config";
import { pool } from "../../database/db";

const login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const user = await pool.query(
    /*sql*/ `
            SELECT * FROM users WHERE email = $1  
        `,
    [email],
  );

  if (user.rowCount === 0 || !user.rows[0].is_active) {
    throw new Error("Invalid credential!");
  }

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchPassword) {
    throw new Error("Invalid credential!");
  }

  delete user.rows[0].password;

  return user.rows[0];
};

const generateToken = async (token: string) => {
  const decode = jwt.verify(
    token,
    appConfig.refresh_token_secret,
  ) as JwtPayload;

  const user = await pool.query(
    /*sql*/ `
            SELECT * FROM users WHERE id=$1
        `,
    [decode.id],
  );

  if (user.rowCount === 0 || !user.rows[0].is_active) {
    throw new Error("User not found!");
  }

  return user.rows[0];
};

export const authService = {
  login,
  generateToken,
};
