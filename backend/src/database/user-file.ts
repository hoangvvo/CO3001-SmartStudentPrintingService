// CREATE TABLE user_file (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER NOT NULL REFERENCES app_user(id),
//   file_name VARCHAR(255) NOT NULL,
//   file_size INTEGER NOT NULL,
//   file_type VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP NOT NULL DEFAULT NOW()
// );

import { pool } from "./database.js";
import type { UserFileDbObject } from "./types.js";

export const userFileRepository = {
  async createUserFile(userFile: {
    user_id: number;
    file_name: string;
    file_size: number;
    file_type: string;
    file_path: string;
  }) {
    const res = await pool.query<UserFileDbObject>(
      `
      INSERT INTO user_file (user_id, file_name, file_size, file_type, file_path)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [
        userFile.user_id,
        userFile.file_name,
        userFile.file_size,
        userFile.file_type,
        userFile.file_path,
      ],
    );

    return res.rows[0];
  },

  async getUserFileById(id: number) {
    const res = await pool.query<UserFileDbObject>(
      `
      SELECT * FROM user_file WHERE id = $1
    `,
      [id],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async getUserFilesByUserId(user_id: number) {
    const res = await pool.query<UserFileDbObject>(
      `
      SELECT * FROM user_file WHERE user_id = $1
    `,
      [user_id],
    );

    return res.rows;
  },

  async getUserFiles() {
    const res = await pool.query<UserFileDbObject>(
      `
      SELECT * FROM user_file
    `,
    );

    return res.rows;
  },

  async updateUserFileById(
    id: number,
    userFile: {
      user_id: number;
      file_name: string;
      file_size: number;
      file_type: string;
    },
  ) {
    const res = await pool.query<UserFileDbObject>(
      `
      UPDATE user_file SET user_id = $1, file_name = $2, file_size = $3, file_type = $4
      WHERE id = $5
      RETURNING *
    `,
      [
        userFile.user_id,
        userFile.file_name,
        userFile.file_size,
        userFile.file_type,
        id,
      ],
    );

    return res.rows[0];
  },

  deleteUserFileById(id: number) {
    return pool.query<UserFileDbObject>(
      `
      DELETE FROM user_file WHERE id = $1
    `,
      [id],
    );
  },
};
