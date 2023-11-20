import { pool } from "./database.js";
import type { AppSessionDbObject, UserDbObject } from "./types.js";

export const appSessionRepository = {
  async deleteSessionByToken(token: string) {
    await pool.query(
      `
      DELETE FROM app_session
      WHERE token = $1
    `,
      [token],
    );
  },

  async getUserBySessionToken(token: string) {
    const res = await pool.query<UserDbObject>(
      `
      SELECT
        u.id,
        u.email,
        u.name,
        u.role
      FROM app_user u
      JOIN app_session s
        ON u.id = s.user_id
      WHERE s.token = $1
        AND s.expires_at > NOW()
    `,
      [token],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async insertSession(session: {
    user_id: number;
    token: string;
    expires_at: Date;
  }) {
    const res = await pool.query<AppSessionDbObject>(
      `
      INSERT INTO app_session (user_id, token, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [session.user_id, session.token, session.expires_at],
    );

    return res.rows[0];
  },
};
