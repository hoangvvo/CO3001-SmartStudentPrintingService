export interface UserDbObject {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
}

export interface AppSessionDbObject {
  id: number;
  user_id: number;
  token: string;
  created_at: Date;
  expires_at: Date;
}
