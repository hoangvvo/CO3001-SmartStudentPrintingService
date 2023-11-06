import argon2 from "argon2";
import { nanoid } from "nanoid";
import { appSessionRepository } from "../database/app-session.js";

export const authService = {
  comparePassword(password: string, passwordHash: string): Promise<boolean> {
    return argon2.verify(passwordHash, password);
  },

  hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  },

  async createSession(userId: number) {
    const token = nanoid(32);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await appSessionRepository.insertSession({
      user_id: userId,
      token,
      expires_at: expiresAt,
    });

    return { token, expiresAt };
  },

  async deleteSession(token: string) {
    return appSessionRepository.deleteSessionByToken(token);
  },

  async getUserBySession(token: string) {
    const res = await appSessionRepository.getUserBySessionToken(token);
    if (!res) {
      return null;
    }

    return {
      id: res.id,
      email: res.email,
      name: res.name,
    };
  },
};
