import { pool } from "../../database/db";
import { IProfile } from "./profile.interface";

const createProfile = async (payload: IProfile) => {
  const { address, bio, gender, phone, user_id } = payload;

  const user = await pool.query(
    /*sql*/ `
        SELECT * FROM users WHERE id = $1
    `,
    [user_id],
  );

  if (user.rowCount === 0) {
    throw new Error("User not Exist!");
  }

  const isProfileExist = await pool.query(
    /*sql*/ `
        SELECT * FROM profiles WHERE user_id = $1
    `,
    [user_id],
  );

  if (isProfileExist.rowCount !== 0) {
    throw new Error("Profile already exist!");
  }

  const result = await pool.query(
    /*sql*/ `
            INSERT INTO profiles(address, bio, gender, phone, user_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
            `,
    [address, bio, gender, phone, user_id],
  );
  return result.rows[0];
};

export const profileService = {
  createProfile,
};
