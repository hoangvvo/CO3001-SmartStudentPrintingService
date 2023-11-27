import { pool } from "./database.js";
import type { UserDbObject } from "./types.js";

export const appUserRepository = {
  async createUser(user: {
    email: string;
    password_hash: string;
    name: string;
  }) {
    const res = await pool.query<UserDbObject>(
      `
      INSERT INTO app_user (email, password_hash, name)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [user.email, user.password_hash, user.name],
    );

    return res.rows[0];
  },

  async getUserByEmail(email: string) {
    const res = await pool.query<UserDbObject>(
      `
      SELECT * FROM app_user WHERE email = $1
    `,
      [email],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async getUserById(id: number) {
    const res = await pool.query<UserDbObject>(
      `
      SELECT * FROM app_user WHERE id = $1
    `,
      [id],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async getUsersByIds(ids: number[]) {
    const res = await pool.query<UserDbObject>(
      `
      SELECT * FROM app_user WHERE id = ANY($1)
    `,
      [ids],
    );

    return res.rows;
  },
};
