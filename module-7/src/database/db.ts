import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: databaseUrl,
});

const connectDB = async () => {
  try {
    await pool.query(/*sql*/ `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        age INT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(/*sql*/ `
        CREATE TABLE IF NOT EXISTS profiles (
          id SERIAL PRIMARY KEY,
          user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
          bio TEXT,
          address TEXT,
          phone VARCHAR(15),
          gender VARCHAR(15),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `);

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectDB;
