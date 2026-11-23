import bcrypt from "bcryptjs";
import { pool } from "../../database/db";
import { IUser } from "./user.interface";

const createUser = async (payload: IUser) => {
  const { name, age, email, password, role } = payload;

  const user = await pool.query(
    /*sql*/ `
        SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  if (user.rowCount !== 0) {
    throw new Error("User already Exist!");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    /*sql*/ `
            INSERT INTO users(name, age, email, password, role)
            VALUES ($1, $2, $3, $4, COALESCE($5, 'user')) RETURNING *
            `,
    [name, age, email, hashPassword, role],
  );
  return result.rows[0];
};

const updateUser = async (id: number, payload: Partial<IUser>) => {
  const { name, age, role } = payload;

  const user = await pool.query(
    /*sql*/ `
        SELECT * FROM users WHERE id = $1
    `,
    [id],
  );

  if (user.rowCount === 0) {
    throw new Error("User not Exist!");
  }

  const result = await pool.query(
    /*sql*/ `
            UPDATE users
            SET name = COALESCE($1, name),
            age = COALESCE($2, age),
            role = COALESCE($3, role),
            updated_at = NOW()
            WHERE id = $4
            RETURNING *
            `,
    [name ?? null, age ?? null, role ?? null, id],
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query(/*sql*/ `
    SELECT * FROM users
    `);

  return result.rows;
};

const getSingleUser = async (id: number) => {
  const result = await pool.query(
    /*sql*/ `
      SELECT * FROM users WHERE id = $1    
    `,
    [id],
  );
  if (result.rowCount === 0) {
    throw new Error("No user found!");
  }
  return result.rows[0];
};

const deleteUser = async (id: number) => {
  const result = await pool.query(
    /*sql*/ `
      DELETE FROM users WHERE id = $1    
    `,
    [id],
  );
  if (result.rowCount === 0) {
    throw new Error("No user found!");
  }
  return result.rows[0];
};

export const userService = {
  createUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
